import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AdminHeader from './AdminHeader';

function AddProducts() {
  const navigate = useNavigate();

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

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 5 MB (adjust this value as needed)

    if (file && file.size <= maxSize) {
      setImg(file);
    } else {
      // Notify the user if the file exceeds the size limit
      alert("Please select an image file smaller than 2 MB.");
      // Clear the input field to allow the user to select a new file
      e.target.value = null;
    }
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
      size,
    };

    // Send product data to the server
    axios
      .post("http://localhost:8070/product/add", newProduct)
      .then(() => {
        alert("Product Added");
        navigate("/inv/");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container">
      <AdminHeader/>
      <div className="text-center pti-text-h2 pti-bold pb-4">ADD PRODUCTS</div>
      <form onSubmit={sendData}>
        <div className="d-flex justify-content-center gap-4 ">
          {/* id */}
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <div className="form-label pti-text-dark pti-bold">Product ID</div>
            <input
              type="text"
              className="add-product-input form-control"
              onChange={(e) => {
                setID(e.target.value);
              }}
            />
          </div>
          {/* image */}
          <div className=" pb-4 flex-grow-1">
            <div className="form-label pti-text-dark pti-bold">
              Product Image
            </div>
            <label htmlFor="uploadImage">
              <div className="uploadBox">
                <input type="file" className="add-product-upload" id="img" onChange={handleUploadImage} />
              </div>
            </label>
          </div>
        </div>
        {/* second row */}
        <div className="d-flex justify-content-center gap-4">
          {/* name */}
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label htmlFor="name" className="form-label pti-text-dark pti-bold">
              Product Name
            </label>
            <input
              type="text"
              className="add-product-input form-control"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          {/* quantity */}
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label
              htmlFor="quantity"
              className="form-label pti-text-dark pti-bold"
            >
              Quantity
            </label>
            <input
              type="number"
              min="0"
              className="add-product-input form-control"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="mb-3 d-flex flex-column align-items-start">
          <label
            htmlFor="description"
            className="form-label pti-text-dark pti-bold"
          >
            Product Description
          </label>
          <input
            type="text"
            className="add-product-input form-control"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        {/* third row */}
        <div className="d-flex justify-content-center gap-4">
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label
              htmlFor="weight"
              className="form-label pti-text-dark pti-bold"
            >
              Weight
            </label>
            <input
              type="number"
              min="0"
              className="add-product-input form-control"
              onChange={(e) => {
                setWeight(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label
              htmlFor="unit_price"
              className="form-label pti-text-dark pti-bold"
            >
              Unit Price
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="add-product-input form-control"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label htmlFor="size" className="form-label pti-text-dark pti-bold">
              Size
            </label>
            <select
              className="add-product-input form-control"
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              <option value="" disabled selected>
                Select a size
              </option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-center gap-2 pt-4">
          <button
            type="submit"
            className="add-product-btn pti-bold btn btn-primary pti-rounded-small" >
            Submit
          </button>
          <button type="reset" className="add-product-btn bg-black text-light pti-bold pti-rounded-small">cancel</button>
          
        </div>
      </form>
      <br />
    </div>
  );
}

export default AddProducts;
