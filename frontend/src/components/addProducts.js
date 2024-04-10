import React, { useState } from "react";
import axios from "axios";

function AddProducts() {
  const [product_ID, setID] = useState("");
  const [img, setImg] = useState("");
  const [product_name, setName] = useState("");
  const [product_description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [unit_price, setPrice] = useState("");
  const [size, setSize] = useState("");

  const imagebase64 = async (file) => {
    const reader = new FileReader();
    await reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const sendData = async (e) => {
    e.preventDefault();

    // Convert image to base64 if available
    let imageBase64 = "";
    if (img) {
      imageBase64 = await imagebase64(img);
    }

    const newProduct = {
      product_ID,
      image: imageBase64, // Include base64 image data in product data
      product_name,
      product_description,
      quantity: Number(quantity),
      weight: Number(weight),
      unit_price: Number(unit_price),
      size
    };

    // Send product data to the server
    axios
      .post("http://localhost:8070/product/add", newProduct)
      .then(() => {
        alert("Product Added");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleUploadImage = (e) => {
    setImg(e.target.files[0]);
  };

  return (
    <div className="container">
      <form onSubmit={sendData}>
        <div className="mb-3 d-flex flex-column align-items-start">
          <div className="form-label">Product ID</div>
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setID(e.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="uploadImage">
            <div className="uploadBox">
              <input
                type="file"
                id="img"
                onChange={handleUploadImage}
              />
            </div>
          </label>
        </div>

        <div className="mb-3 d-flex flex-column align-items-start">
          <label htmlFor="name" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-3 d-flex flex-column align-items-start">
          <label htmlFor="description" className="form-label">
            Product Description
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="mb-3 d-flex flex-column align-items-start">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
        <div className="mb-3 d-flex flex-column align-items-start">
          <label htmlFor="weight" className="form-label">
            Weight
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setWeight(e.target.value);
            }}
          />
        </div>
        <div className="mb-3 d-flex flex-column align-items-start">
          <label htmlFor="unit_price" className="form-label">
            Unit Price
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div className="mb-3 d-flex flex-column align-items-start">
          <label htmlFor="size" className="form-label">
            Size
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setSize(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProducts;
