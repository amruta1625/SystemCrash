import React from 'react';
import './sellpage.css';
import logotradethrill from '../../logotradethrill.svg'; 

const SellPage = () => {
    const backgroundStyle = {
        backgroundImage: `repeating-radial-gradient(circle at 0 0, transparent 0, #F3F1E1 10px),
                          repeating-linear-gradient(#dbcd9d55, #dbcd9d)`,
        width: '100%', // Set width to cover the entire container
        height: '100%', // Set height to cover the entire container
        position: 'fixed', // Fix the position to cover the entire viewport
        top: 0,
        left: 0
    };

    const toggleSubOptions = (arrow) => {
        const subOptions = arrow.nextElementSibling;
      
        // Check if subOptions exists before manipulating its classList
        if (subOptions) {
          subOptions.classList.toggle('visible');
        } else {
          console.error('Sub-options not found');
        }
      };

      const selectSubOption = (option) => {
        const parentSubOptions = option.parentElement;
        const subOptions = parentSubOptions.querySelectorAll('.sub-option');
      
        subOptions.forEach((subOption) => {
          subOption.classList.remove('selected');
        });
      
        option.classList.add('selected');
      
        subOptions.forEach((subOption) => {
          if (subOption !== option) {
            subOption.style.display = 'none';
          }
        });
      };

      const handleBoxClick = () => {
        alert('Box clicked!'); // Replace with your actual implementation
      };

      const selectPhoto = () => {
        console.log('Photo selected'); // Replace with your actual implementation
      };





  return (
    
      
    
    <div>
      <header>
        <div className="curved-box box1">SELL</div>
        <div className="container">
          <span className="outside-text">UPLOAD PHOTO</span>
          <div className="curved-box box2" id="uploadButton" onClick={selectPhoto}>
            Select Photo
          </div>
          <input type="file" id="photoInput" accept="image/*" style={{ display: 'none' }} />
          <div id="photoContainer">
            <img id="uploadedPhoto" src="" alt="Not yet Uploaded" style={{ maxWidth: '300px' }} />
          </div>
        </div>

        <div className="container">
          <span className="outside-text">CATEGORY</span>
          <div className="curved-box box5" style={{ marginLeft: '230px' }}>
            Select Category
          </div>
          <div className="arrow" onClick={() => toggleSubOptions(document.querySelector('.arrow'))}>▼</div>
          <div className="sub-options">
            <div className="sub-option" onClick={() => selectSubOption('.sub-option')}>
              Electronics
            </div>
            <div className="sub-option" onClick={() => selectSubOption('.sub-option')}>Cycle</div>
            <div className="sub-option" onClick={() => selectSubOption('.sub-option')}>Stationary</div>
            <div className="sub-option" onClick={() => selectSubOption('.sub-option')}>Lab Stuff</div>
            <div className="sub-option" onClick={() => selectSubOption('.sub-option')}>Books</div>
            <div className="sub-option" onClick={() => selectSubOption('.sub-option')}>Sports Essentials</div>
          </div>
        </div>

        <div className="container">
          <span className="outside-text">PRODUCT DESCRIPTION</span>
          <div className="curved-box box3" style={{ marginLeft: '140px' }} contentEditable={true} placeholder="Information and details of the product">
            
          </div>
        </div>

        <div className="container">
          <span className="outside-text">BASE PRICE</span>
          <div className="curved-box box2" style={{ marginLeft: '230px' }} contentEditable={true}>
            Enter the price
          </div>
        </div>

        <div className="container">
          <span className="outside-text">USING SINCE</span>
          <div className="curved-box box2" style={{ marginLeft: '220px' }} contentEditable={true}>
            Enter the age
          </div>
        </div>

        <div className="container">
          <div className="curved-box box4" style={{ marginLeft: '510px' }} id="myBox" onClick={handleBoxClick}>
            SUBMIT
          </div>
        </div>

        <h1></h1>
        <nav>
          <ul></ul>
        </nav>
      </header>

      <main>
        <section>
          <h2></h2>
          <p></p>
        </section>

        <section>
          <h2></h2>
          <p></p>
          <p></p>
        </section>
      </main>

      <footer>
        <p></p>
      </footer>
    </div>
    
  );
};

export default SellPage;
