from stuff import model
from stuff import database
from fastapi import HTTPException
from fastapi import UploadFile, File
from typing import List
from datetime import datetime

import smtplib
import random
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os 
from dotenv import load_dotenv

load_dotenv()

def send_otp_email(receiver_email, otp):
    sender_email =  os.getenv("OTP_SENDER_EMAIL") # Enter your email address
    sender_password = os.getenv("OTP_SENDER_PASSWORD") # Enter your email password
    # print(sender_email + " " + sender_password)

    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = receiver_email
    message['Subject'] = "Your One Time Password (OTP)"
    body = f"Welcome to TradeThrill. Your OTP to start your experience with us is: {otp}"
    message.attach(MIMEText(body, 'plain'))
    # print("Reached")

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(sender_email, sender_password)
    text = message.as_string()
    server.sendmail(sender_email, receiver_email, text)
    server.quit()

async def handle_register(data:model.User_For_Registration):
    # print(data)
    cursor.execute("SELECT COUNT(*) FROM reports WHERE reported_id = %s", (data.user_id,))
    num_reports = cursor.fetchone()[0]
    if num_reports >= 7:
        raise HTTPException(status_code=403, detail="User access restricted due to reports")
    
    if data.hashed_password != data.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    email = f"{data.user_id}@iitk.ac.in"
    otp = random.randrange(100000, 999999, 1)
    try:
        send_otp_email(email, otp)
    except Exception as e:
        #error in sending otp
        raise HTTPException(status_code=500, detail="Internal server error. Please try again later")
    conn,cursor=database.make_db()
    try:
        check_query = f"SELECT * FROM users WHERE user_id = '{data.user_id}'"
        cursor.execute(check_query)
        result = cursor.fetchall()
        if result == []:
            query = f"""insert into users values('{data.user_id}', '{email}', '{data.hashed_password}', '{data.name}', NULL, '{otp}', FALSE)"""
            cursor.execute(query)
            conn.commit()
            return data
    except Exception as e:
        #Error in registering user
        conn.rollback()  # Rollback any pending changes
        raise HTTPException(status_code=500, detail="Internal server error. Please try again later")
    finally:
        conn.close()
    
    return False

async def verify_otp(data:model.OTP):
    conn, cursor = database.make_db()
    try:
        query = f"SELECT otp FROM users WHERE user_id = '{data.user_id}'"
        cursor.execute(query)
        result = cursor.fetchone()

        if result and result[0] == data.otp:
            update_query = f"UPDATE users SET verified = TRUE WHERE user_id = '{data.user_id}'"
            cursor.execute(update_query)
            conn.commit()  
            conn.close()
            return True
        else:
            raise HTTPException(status_code=400, detail="Invalid OTP")
    except Exception as e:
        #error in verifying otp
        conn.rollback()  # Rollback any pending changes
        raise HTTPException(status_code=500, detail="Internal server error. Please try again later")
    finally:
        conn.close()
    # conn.close()

    # return False

def otp_email_forgotpass(receiver_email, otp):
    sender_email =  os.getenv("OTP_SENDER_EMAIL") # Enter your email address
    sender_password = os.getenv("OTP_SENDER_PASSWORD") # Enter your email password
    # print(sender_email + " " + sender_password)

    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = receiver_email
    message['Subject'] = "Your One Time Password (OTP)"
    body = f"Your OTP to change your password is: {otp}"
    message.attach(MIMEText(body, 'plain'))
    # print("Reached")

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        text = message.as_string()
        server.sendmail(sender_email, receiver_email, text)
        server.quit()
    except Exception as e:
        #error in sending otp
        raise HTTPException(status_code=500, detail="Internal server error. Please try again later")

async def forgot_password(data:model.ForgotPassword):
    cursor.execute("SELECT COUNT(*) FROM reports WHERE reported_id = %s", (data.user_id,))
    num_reports = cursor.fetchone()[0]
    if num_reports >= 7:
        raise HTTPException(status_code=403, detail="User access restricted due to reports")
    
    if data.new_password != data.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    conn, cursor = database.make_db()
    try:
        verify_user_query = f"SELECT verified FROM users WHERE user_id = '{data.user_id}'"
        cursor.execute(verify_user_query)
        user = cursor.fetchone()

        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        elif not user[0]:
            raise HTTPException(status_code=400, detail="User is not verified")

        email = f"{data.user_id}@iitk.ac.in"
        otp = random.randrange(100000, 999999, 1)
        otp_email_forgotpass(email, otp)

        query = f"""insert into change_password values('{data.user_id}', '{data.new_password}', '{otp}')"""
        cursor.execute(query)
        conn.commit()
        return data
    except Exception as e:
        #error in reseting password
        conn.rollback()  # Rollback any pending changes
        raise HTTPException(status_code=500, detail="Internal server error. Please try again later")
    finally:
        conn.close()

async def new_otp(data:model.OTP):
    conn, cursor = database.make_db()
    
    try:
        verify_query = f"SELECT otp FROM change_password WHERE user_id = '{data.user_id}'"
        cursor.execute(verify_query)
        result = cursor.fetchone()
        if result and result[0] == data.otp:
            query = f"SELECT new_password FROM change_password WHERE user_id = '{data.user_id}'"
            cursor.execute(query)
            new_password = cursor.fetchone()
            update_query = f"UPDATE users SET hashed_password = '{new_password[0]}' WHERE user_id = '{data.user_id}'"
            cursor.execute(update_query)
            # conn.commit()
            # conn.close()

            delete_query = f"DELETE FROM change_password WHERE user_id = '{data.user_id}'"
            cursor.execute(delete_query)
            # conn.commit()
            # conn.close()

            conn.commit()
            conn.close()
            return True
        
        else:
            raise HTTPException(status_code=400, detail="Invalid OTP")
    except Exception as e:
        #error in verifying otp
        conn.rollback()  # Rollback any pending changes
        raise HTTPException(status_code=500, detail="Internal server error. Please try again later")
    finally:
        conn.close()  # Ensure connection is closed

    # check_query = f"SELECT * FROM users WHERE user_id = '{data.user_id}'"
    # cursor.execute(check_query)
    # result = cursor.fetchall()
    
async def get_user_info(user_id: int):
    # function for getting the data of the user and it has been made as a sub function so as to assist the login function
    query = """
select user_id, email, name, photo, verified from users where user_id = '{user_id}'
"""
    conn, cursor = database.make_db()
    cursor.execute(query)
    results = cursor.fetchall()
    results = results[0]
    data = {
        "user_id": user_id,
        "email": results[1],
        "name": results[2],
        "photo": results[3],
        "verified": results[4]
    }
    return data

async def notify_request(data:model.Notifications):
    conn, cursor = database.make_db()
    time = datetime.today().strftime('%Y-%m-%d')
    query = f"""INSERT INTO notifications VAlUES ('{data.buyer_id}', '{data.seller_id}', '{time}', 0)"""
    cursor.execute(query)
    conn.commit()
    conn.close()

async def notify_accept(data:model.Notifications):
    conn, cursor = database.make_db()
    time = datetime.today().strftime('%Y-%m-%d')
    query = f"""INSERT INTO notifications VAlUES ('{data.seller_id}', '{data.buyer_id}', '{time}', 1)"""
    cursor.execute(query)
    conn.commit()
    conn.close()

async def notify_reject(data:model.Notifications):
    conn, cursor = database.make_db()
    time = datetime.today().strftime('%Y-%m-%d')
    query = f"""INSERT INTO notifications VAlUES ('{data.seller_id}', '{data.buyer_id}', '{time}', 2)"""
    cursor.execute(query)
    conn.commit()
    conn.close()

async def notify_message(data:model.Notifications):
    conn, cursor = database.make_db()
    time = datetime.today().strftime('%Y-%m-%d')
    query = f"""INSERT INTO notifications VAlUES ('{data.seller_id}', '{data.buyer_id}', '{time}', 3)"""
    cursor.execute(query)
    conn.commit()
    conn.close()

async def get_notifications(user_id: int):
    # this function is to get the notifications from the user live and assist the login function
    """
    notifications will have time, from_user, to_user, type
    type = enum{REQUEST TO BUY, ACCEPTED TO SELL, REJECTED TO SELL, SOME MESSAGED YOU}
    It returns an array of objects of tuple of the order (<from_user_name>, <type_of_notification>, <time>)
    0 request to buy
    1 accepted to sell
    2 rejected to sell
    3 someone messaged
    """
    query = f"""
select from_name, type, time from (select u.name as from_name, n.time as time, n.type as type, 
    n.to_user as to_user  from notifications as n inner join users as u on u.user_id =n.from_user ) where to_user = {user_id}
"""
    conn, cursor = database.make_db()
    cursor.execute(query)
    results = cursor.fetchall()
    conn.close()
    return results

async def login(data:model.User):
    conn, cursor = database.make_db()
    cursor.execute("SELECT COUNT(*) FROM reports WHERE reported_id = %s", (data.user_id,))
    num_reports = cursor.fetchone()[0]
    if num_reports >= 7:
        raise HTTPException(status_code=403, detail="User access restricted due to reports")
    
    query = f"SELECT hashed_password, verified FROM users WHERE user_id='{data.user_id}'"
    cursor.execute(query)
    result = cursor.fetchone()
    if result:
        hashed_password, verified = result
        if verified and hashed_password == data.hashed_password:
            conn.close()
            # add code for sending the user data, notifications
            data = {}
            user_info = await get_user_info(data.user_id)
            user_notifications = await get_notifications(data.user_id)
            data = { **data, **user_info, "notifications": user_notifications }
            return data
        else:
            conn.close()
            raise HTTPException(status_code=401, detail="Incorrect password or unverified account")
            return False
        
    else:
        conn.close()
        raise HTTPException(status_code=404, detail="User not found")

    # return False

# IMAGES_DIR = "images/products"
# os.makedirs(IMAGES_DIR, exist_ok=True)

# async def save_uploaded_file(file: UploadFile) -> str:
#     file_path = os.path.join(IMAGES_DIR, file.filename)
#     with open(file_path, "wb") as buffer:
#         buffer.write(await file.read())
#     return file_path

# async def insert_product_images(product_id: int, image_urls: List[str]):
#     conn, cursor = database.make_db()

#     try:
#         for image_url in image_urls:
#             await cursor.execute("INSERT INTO product_images (product_id, image_url) VALUES ($1, $2)", product_id, image_url)
#             conn.commit()
#     finally:
#         await conn.close()


async def products(data:model.Product, files: List[UploadFile] = File(...)):            #check the files code
    conn, cursor = database.make_db()
    cursor.execute("SELECT MAX(product_id) FROM products")
    result = cursor.fetchone()
    if result and result[0]:
        product_id = int(result[0]) + 1
    else:
        product_id = 100000
    
    query = f"""insert into products values ('{product_id}', '{data.seller_id}', '{data.sell_price}', '{data.cost_price}', '{data.title}', NULL, '{data.usage}', '{data.description}', '{data.tags}')"""
    cursor.execute(query)

    # image_urls = []
    # for file in files:
    #     file_path = await save_uploaded_file(file)
    #     image_urls.append(file_path)
        
    # await insert_product_images(product_id, image_urls)
    conn.commit()
    conn.close()
    return data

async def update_interests(product_id):
    conn, cursor = database.make_db()
    query = f"""UPDATE products SET nf_interests = (SELECT COUNT(*) FROM wishlist WHERE wishlist.product_id = '{product_id}') WHERE product_id = '{product_id}'"""
    cursor.execute(query)
    conn.commit()
    conn.close()

async def wishlist(data:model.Wishlist):
    conn, cursor = database.make_db()
    try:
        query = f"SELECT seller_id FROM products WHERE product_id = '{data.product_id}'"
        cursor.execute(query)
        result = cursor.fetchone()

        if result:
            seller_id = result[0]
            insert_query = f"insert into wishlist values('{data.product_id}', '{seller_id}', '{data.buyer_id}')"
            cursor.execute(insert_query)
            conn.commit()

            await update_interests(data.product_id)

            return data
        
        else:
            raise HTTPException(status_code=404, detail="Product not found")
    
    except Exception as e:
        #Error in adding to wishlist
        conn.rollback()
        raise HTTPException(status_code=500, detail= "Unternal server error. Please try again later")
    finally:
        conn.close()

async def get_wishlist(user_id: int):
    conn, cursor = database.make_db()
    query = f"""SELECT products.seller_id, products.sell_price, products.cost_price, 
                products.title, products.usage, products.description FROM 
                (select * from wishlist where buyer_id = {user_id}) 
                as w inner join products on w.product_id = products.product_id"""
    cursor.execute(query)
    results = cursor.fetchall()
    return_value = []
    for result in results:
        data = {
            "seller_id":result[0],
            "sell_price":result[1],
            "cost_price":result[2],
            "title":result[3],
            "usage":result[4],
            "description":result[5]
        }
        return_value.append(data)
    return return_value

async def transactions(data:model.Transactions):
    conn, cursor = database.make_db()
    try:
        query = f"SELECT sell_price, title, description FROM products WHERE product_id = '{data.product_id}'"
        cursor.execute(query)
        product_data = cursor.fetchone()

        if product_data:
            sell_price, title, description = product_data
            insert_query = f"INSERT INTO transactions (product_id, seller_id, buyer_id, cost, title, description) VALUES (%s, %s, %s, %s, %s, %s)"
            cursor.execute(insert_query, (data.product_id, data.seller_id, data.buyer_id, sell_price, title, description))
            conn.commit()
            return data
        else:
            raise HTTPException(status_code=404, detail="Product not found")
        
    except Exception as e:
        #Error in loading transcation
        conn.rollback()
        raise HTTPException(status_code=500, detail="Internal server error. PLease try again later")
    finally:
        conn.close()
  
async def get_transactions(user_id: int):
    conn, cursor = database.make_db()
    sold_query = f"""SELECT buyer_id, cost, title, description FROM transactions WHERE seller_id = {user_id}"""
    cursor.execute(sold_query)
    sold_results = cursor.fetchall()
    return_value = {
        "sold_results": [],
        "bought_results": []
    }
    for result in sold_results:
        data = {
            "buyer_id": result[0],
            "cost": result[1],
            "title": result[2],
            "description": result[3]
        }
        return_value["sold_results"].append(data)
    bought_query = f"""SELECT seller_id, cost, title, description FROM transactions WHERE buyer_id = {user_id}"""
    cursor.execute(bought_query)
    bought_results = cursor.fetchall()
    for result in bought_results:
        data = {
            "seller_id": result[0],
            "cost": result[1],
            "title": result[2],
            "description": result[3]
        }
        return_value["bought_results"].append(data)
    return return_value

async def search(data: model.Search):           #do the code where spaces arent included
                                                #one idea is when you take the input and in the initial phase itself
                                                #convert title and description into a str with no spaces
                                                #but then the issue would be where the checking number of words exists 
                                                #may be then check number of words that are together                            

    conn, cursor = database.make_db()

    words = data.query.split()

    title_conditions = " + ".join([f"CASE WHEN title ILIKE '%%{word}%%' THEN 1 ELSE 0 END" for word in words])
    description_conditions = " + ".join([f"CASE WHEN description ILIKE '%%{word}%%' THEN 1 ELSE 0 END" for word in words])

    search_query = f"""
        SELECT 
            p.*,
            u.name AS seller_username,
            u.email AS seller_email
        FROM 
            (SELECT 
                p.*,
                ({title_conditions}) AS title_score,
                ({description_conditions}) AS description_score
            FROM 
                products p
            WHERE 
                ({title_conditions}) > 0 OR ({description_conditions}) > 0) AS p
        JOIN
            users u ON p.seller_id = u.user_id
        ORDER BY 
            (p.title_score + p.description_score) DESC
    """
    cursor.execute(search_query)
    search_results = cursor.fetchall()

    conn.close()
    return search_results

async def upload(data: model.ProductImage):
    # save the files locally
    # save the files in db
    conn, cursor = database.make_db()
    pid = data.pid
    files = []
    files.append(data.Image1)
    files.append(data.Image2)
    files.append(data.Image3)
    files.append(data.Image4)
    files.append(data.Image5)
    try:
        for file in files:
            curr_dir = os.getcwd()
            await file.save(f"{curr_dir}/stuff/file_buffer/{file.filename}")
            print("File added")
            file_path = f"{curr_dir}/stuff/file_buffer/{file.filename}"
            query = f"""INSERT INTO product_images VALUES ({pid}, pg_read_binary_file('{file_path}')::bytea)"""
            cursor.execute(query)
            os.remove(file_path)
            print("File removed")
        conn.commit()
    except Exception as e:
        print(f"Could not upload file")
        print(e)

async def edit_profile(data: model.EditProfile):
    conn, cursor = database.make_db()
    user_id = data.user_id
    files = []
    files.append(data.photo)
    try:
        for file in files:
            curr_dir = os.getcwd()
            await file.save(f"{curr_dir}/stuff/file_buffer/{file.filename}")
            print("File added")
            file_path = f"{curr_dir}/stuff/file_buffer/{file.filename}"
            query = f"""UPDATE users SET photo = pg_read_binary_file('{file_path}')::bytea where user_id = {user_id}"""
            cursor.execute(query)
            os.remove(file_path)
            print("File removed")
        conn.commit()
    except Exception as e:
        print(f"Could not upload file")
        print(e)
    name_query = f"""UPDATE users SET name = {data.name} where user_id = {user_id}"""
    cursor.execute(name_query)
    conn.commit()
    conn.close()

async def report_user(data: model.Report):
    conn, cursor = database.make_db()
    cursor.execute("SELECT COUNT(*) FROM reports WHERE reporter_id = %s AND reported_id = %s",
                   (data.reporter_id, data.reported_id))
    if cursor.fetchone()[0] > 0:
        raise HTTPException(status_code=400, detail="User has already been reported by this reporter")

    cursor.execute("INSERT INTO reports (reporter_id, reported_id) VALUES (%s, %s)",
                   (data.reporter_id, data.reported_id))
    conn.commit()

    return {"message": "User reported successfully"}

async def view_profile(user_id: int):
    conn, cursor = database.make_db()
    query = f"""SELECT name, email, photo FROM users WHERE user_id = {user_id}"""
    cursor.execute(query)
    conn.close()
    result = cursor.fetchone()
    if result:
        name, email, photo = result
        return {"name": name, "email": email, "photo": photo}
    else:
        raise HTTPException(status_code=404, detail="User not found")
    
async def get_products():
    conn, cursor = database.make_db()
    query = """
    SELECT 
        p.product_id,
        p.title AS product_title,
        p.sell_price,
        u.name AS seller_name,
        u.email AS seller_email,
        i.photo AS product_image
    FROM 
        products p
    JOIN 
        users u ON p.seller_id = u.user_id
    JOIN 
        product_images i ON p.product_id = i.product_id
    """
    cursor.execute(query)
    results = cursor.fetchall()
    conn.close()

    if results:
        products = []
        for row in results:
            product = {
                "product_id": row[0],
                "product_title": row[1],
                "sell_price": row[2],
                "seller_name": row[3],
                "seller_email": row[4],
                "product_image": row[5]
            }
            products.append(product)
        return products
    else:
        return []

async def get_specific_product(product_id: int):
    conn, cursor = database.make_db()
    query = f"""SELECT seller_id, sell_price, cost_price, title, usage, description FROM products WHERE product_id = {product_id} """
    cursor.execute(query)
    result = cursor.fetchone()
    data = {
        "seller_id":result[0],
        "sell_price":result[1],
        "cost_price":result[2],
        "title":result[3],
        "usage":result[4],
        "description":result[5]
    }
    return data


# remove product














# just checking
async def fun(data:model.Product):
    conn, cursor = database.make_db()
    cursor.execute("SELECT MAX(product_id) FROM fun")
    result = cursor.fetchone()
    if result and result[0]:
        product_id = int(result[0]) + 1
    else:
        product_id = 100000
    

    concat = data.title.replace(" ", "").lower() + data.description.replace(" ", "").lower()

    query = f"""insert into fun values ('{product_id}', '{concat}')"""
    cursor.execute(query)

    conn.commit()
    conn.close()
    return data