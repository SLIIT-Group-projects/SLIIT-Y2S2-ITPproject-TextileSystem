import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import AdminHeader from "./AdminHeader";
import AdminMainHeader from "../components/Header";
// Modal component to display image popup
const ImageModal = ({ isModalOpen, selectedImage, closeModal }) => {
  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-content"
        onClick={(e) => {
          // Prevents the modal from closing when clicking inside the content
          e.stopPropagation();
        }}
      >
        <img src={selectedImage} alt="Product" className="modal-image" />
        <button className="modal-close-button" onClick={closeModal}>
          &times;
        </button>
      </div>
    </div>
  );
};

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResult, setNoResult] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const ComponentsRef = useRef();

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/product/");
        setProducts(res.data);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/product/delete/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
      alert("Product deleted successfully");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Error deleting product");
    }
  };

  // Handle report download
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Product Report",
    onAfterPrint: () => alert("Product Report successfully downloaded!"),
  });

  // Handle product search
  const handleSearch = (e) => {
    e.preventDefault();
    const filteredProducts = products.filter(
      (product) =>
        product.product_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        product.product_description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        product.product_ID.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProducts(filteredProducts);
    setNoResult(filteredProducts.length === 0);
  };

  // Open modal to display image
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  return (
    <div>
      <AdminMainHeader />
      <div ref={ComponentsRef} className="inv-Allproducts-page container">
        <AdminHeader />

        {/* Search Bar */}
        <div className="w-100 d-flex justify-content-center pt-4 pb-5">
          <form
            className="inv-search-bar d-flex justify-content-center form-inline"
            onSubmit={handleSearch}
          >
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search products"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-primary my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>

        <div className="d-flex justify-content-between">
          <div className="pti-text-h2 pti-bold text-black">PRODUCTS</div>
          <div className="d-flex gap-3">
            <button className="add-product-btn pti-bg-black p-2 text-light pti-rounded-small pti-bold">
              <Link className="nav-link active" to="/inv/add">
                Add Product
              </Link>
            </button>
            <button
              className="add-product-btn pti-bg-black p-2 text-light pti-rounded-small pti-bold"
              onClick={handlePrint}
            >
              Download Report
            </button>
          </div>
        </div>

        {/* Product Table */}
        <div ref={ComponentsRef}>
          <table border={0} className="inv-Allproducts-table">
            <thead>
              <tr className="inv-Allproducts-table-row pti-bg-secondary_blue text-light rounded-5">
                <th className="inv-Allproducts-table-heading1 p-2">
                  Product ID
                </th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Product Description</th>
                <th>Product Quantity</th>
                <th>Product Weight</th>
                <th>Unit Price</th>
                <th>Size</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {noResult ? (
                <tr>
                  <td colSpan="10" className="text-center">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="pti-bg-light_blue">
                    <td className="inv-Allproducts-table-row1 p-2">
                      {product.product_ID}
                    </td>
                    <td
                      onClick={() => openModal(product.image)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={product.image}
                        width={"200px"}
                        height={"180px"}
                        alt="Product"
                      />
                    </td>
                    <td>{product.product_name}</td>
                    <td>{product.product_description}</td>
                    <td>{product.quantity}</td>
                    <td>{product.weight}</td>
                    <td>{product.unit_price}</td>
                    <td>{product.size}</td>
                    <td>
                      <Link to={`/inv/product/${product._id}`}>
                        <button className="pti-allProducts-tble-buttons pti-allProducts-edit-buttons">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </Link>
                    </td>
                    <td className="inv-Allproducts-table-row2">
                      <button
                        className="pti-allProducts-tble-buttons pti-allProducts-delete-buttons"
                        onClick={() => handleDelete(product._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Include ImageModal component */}
        <ImageModal
          isModalOpen={isModalOpen}
          selectedImage={selectedImage}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
};

export default AllProducts;
