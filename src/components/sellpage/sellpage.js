import React, { useContext, useState, useEffect } from "react";
import "./sellpage.css";
import AuthContext from "../../context/AuthProvider";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Import useHistory hook for navigation

const SellPage = () => {
  const { authCreds, setAuthCreds } = useContext(AuthContext);
  const [pid, setPid] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [data, setData] = useState({
    seller_id: authCreds.user_id,
    sell_price: 0,
    cost_price: 0,
    title: "",
    usage: 0,
    description: "",
    tags: "",
    // image: null,
  });
  const navigate = useNavigate(); 
  const { itemId } = useParams(); 

  useEffect(() => {
    if (itemId) {
      axios
        .get(`https://elan.iith-ac.in:8082/get_item_details/${itemId}`)
        .then((res) => {
          const itemDetails = res.data;
          setData({
            seller_id: itemDetails.seller_id,
            sell_price: itemDetails.sell_price,
            cost_price: itemDetails.cost_price,
            title: itemDetails.title,
            usage: itemDetails.usage,
            description: itemDetails.description,
            tags: itemDetails.tags,
          });
          // If you have an image URL stored in your backend, you can set selectedPhoto as well
          // setSelectedPhoto(itemDetails.imageUrl);
        })
        .catch((error) => {
          console.error("Error fetching item details:", error);
        });
    }
  }, [itemId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend = () => {
      setSelectedPhoto(file);
    // };
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedPhoto);
    formData.append("data", JSON.stringify(data));
//     const formDataEntries = formData.entries();
// for (let entry of formDataEntries) {
//   console.log(entry);
// }
    axios
      // .post("http://127.0.0.1:8000/sellproduct", formData, {
      .post("https://elan.iith-ac.in:8082/sellproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type
        },
      })
      .then((response) => {
        console.log(response.data);
        setPid(response.data.pid);
      })
      .catch((error) => {
        console.error(error);
      });


    const dataToSend = {
      "pid" : pid,
      "Image": selectedPhoto
    }

    try {
      console.log("Data to send:", dataToSend);
      const imageResponse = await axios.post(
        "https://elan.iith-ac.in:8082/upload_product_images",
        dataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Marja bc")

    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <div className="sellpage">
      <div className="sell-container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="sell-container">
            <h1>Product Details</h1>
            <div className="sell-section">
              <h2>UPLOAD PHOTO</h2>
              <div className="upload-photo">
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label htmlFor="file">Select Photo</label>
                {selectedPhoto && (
                  <img
                    src={data.Image}
                    alt="Uploaded"
                    style={{ maxWidth: "300px" }}
                  />
                )}
              </div>
            </div>

            <div className="sell-section">
              <h2>PRODUCT TITLE</h2>
              <input
                type="text"
                name="title"
                placeholder="Enter the title"
                value={data.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="sell-section">
              <h2>CATEGORY</h2>
              <div className="category-selection">
                <select
                  name="tags"
                  value={data.tags}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Cycle">Cycle</option>
                  <option value="Stationary">Stationary</option>
                  <option value="Lab Stuff">Lab Stuff</option>
                  <option value="Books">Books</option>
                  <option value="Sports Essentials">Sports Essentials</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            <div className="sell-section">
              <h2>PRODUCT DESCRIPTION</h2>
              <textarea
                name="description"
                placeholder="Give the detailed information and details of the product"
                value={data.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="sell-section">
              <h2>SELL PRICE</h2>
              <input
                type="number"
                name="sell_price"
                placeholder="Enter the price"
                value={data.sell_price}
                onChange={handleInputChange}
              />
            </div>

            <div className="sell-section">
            <h2>COST PRICE</h2>
              <input
                type="number"
                name="cost_price"
                placeholder="Enter the price"
                value={data.cost_price}
                onChange={handleInputChange}
              />
            </div>

            <div className="sell-section">
              <h2>USING SINCE</h2>
              <input
                type="number"
                name="usage"
                placeholder="Enter number of months"
                value={data.usage}
                onChange={handleInputChange}
              />
            </div>

            <div className="sell-section">
              <button type="submit" className="submit-button">
                SUBMIT
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellPage;