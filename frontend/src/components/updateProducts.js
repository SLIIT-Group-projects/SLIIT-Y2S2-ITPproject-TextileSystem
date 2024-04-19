import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminHeader from '../components/AdminHeader';

function UpdateProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    product_ID: "",
    image: "",
    product_name: "",
    product_description: "",
    quantity: "",
    weight: "",
    unit_price: "",
    size: "",
  });
  const [img, setImg] = useState(null);

  const imageBase64 = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  useEffect(() => {
    // Fetch product data by ID
    const fetchProductData = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:8070/product/get/${id}`
        );
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product data:", error);
        alert("An error occurred while fetching product data");
      }
    };
    fetchProductData();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert image file to base64 if a new file is selected
      if (img) {
        product.image = await imageBase64(img);
      }
      await Axios.put(`http://localhost:8070/product/update/${id}`, product);
      alert("Product updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product");
    }
  };

  return (
    <div className="container">
      <AdminHeader/>
      <div className="text-center pti-text-h2 pti-bold pb-4">
        UPDATE PRODUCTS
      </div>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div className="d-flex justify-content-center gap-4">
          {/* Product ID */}
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label className="form-label pti-text-dark pti-bold">
              Product ID:
            </label>
            <input
              type="text"
              name="product_ID"
              className="add-product-input form-control"
              value={product.product_ID}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label className="form-label pti-text-dark pti-bold">
              Product Image:
            </label>
            <input type="file" onChange={(e) => setImg(e.target.files[0])} />
          </div>
        </div>

        {/* Second row */}
        <div className="d-flex justify-content-center gap-4">
          {/* Product Name */}
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label className="form-label pti-text-dark pti-bold">
              Product Name:
            </label>
            <input
              type="text"
              name="product_name"
              className="add-product-input form-control"
              value={product.product_name}
              onChange={handleInputChange}
            />
          </div>
          {/* Quantity */}
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label className="form-label pti-text-dark pti-bold">
              Quantity:
            </label>
            <input
              type="number"
              name="quantity"
              className="add-product-input form-control"
              value={product.quantity}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* Product Description */}
        <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
          <label className="form-label pti-text-dark pti-bold">
            Product Description:
          </label>
          <input
            type="text"
            name="product_description"
            className="add-product-input form-control"
            value={product.product_description}
            onChange={handleInputChange}
          />
        </div>
        {/* Third row */}
        <div className="d-flex justify-content-center gap-4">
          {/* weight */}
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label className="form-label pti-text-dark pti-bold">
             Weight:
            </label>
            <input
              type="number"
              name="weight"
              className="add-product-input form-control"
              value={product.weight}
              onChange={handleInputChange}
            />
          </div>
          {/* Unit Price */}
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label className="form-label pti-text-dark pti-bold">
              Unit Price:
            </label>
            <input
              type="number"
              name="unit_price"
              className="add-product-input form-control"
              value={product.unit_price}
              onChange={handleInputChange}
            />
          </div>
          {/* Size */}
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label className="form-label pti-text-dark pti-bold">Size:</label>
            <select
              name="size"
              className="add-product-input form-control"
              value={product.size}
              onChange={handleInputChange}
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

        {/* Submit and reset buttons */}
        <div className="d-flex justify-content-center gap-2 pt-4">
          <button
            type="submit"
            className="add-product-btn pti-bold btn btn-primary pti-rounded-small"
          >
            Update
          </button>
          <button
            type="reset"
            className="add-product-btn bg-black text-light pti-bold pti-rounded-small"
          >
            Cancel
          </button>
        </div>
      </form>
      <br />
    </div>
  );
}

export default UpdateProducts;
