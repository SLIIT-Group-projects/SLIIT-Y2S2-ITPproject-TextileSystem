import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResult, setNoResult] = useState(false);
  const ComponentsRef = useRef();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("http://localhost:8070/product/");
        setProducts(res.data);
      } catch (err) {
        alert(err.message);
      }
    }
    fetchProducts();
  }, []);

  // Handle delete function
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8070/product/delete/${productId}`);
      // Remove the deleted product from the state
      setProducts(products.filter((product) => product._id !== productId));
      alert("Product deleted successfully");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Error deleting product");
    }
  };

  // Report download function
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Product Report",
    onAfterPrint: () => alert("Product Report successfully downloaded!"),
  });

  // search function
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
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

  return (
    <div ref={ComponentsRef} className="inv-Allproducts-page container">
      <div className="pti-text-dark pti-text-h1 pti-bold text-center pb-5 pt-3">
        INVENTORY DASHBOARD
      </div>
      <div className="d-flex justify-content-center gap-3 pb-5">
        <button className="inv-allProducts-button pti-bg-secondary_blue pti-bold pti-rounded-small border-0 text-light pti-text-p">
          PRODUCTS
        </button>
        <button className="inv-allProducts-button pti-bg-secondary_blue pti-bold pti-rounded-small border-0 text-light pti-text-p">
          <Link className="nav-link active" to="/material">
            MATERIALS
          </Link>
        </button>
        <button className="inv-allProducts-button pti-bg-secondary_blue pti-bold pti-rounded-small border-0 text-light pti-text-p">
          RELEASED
        </button>
      </div>
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
            <Link className="nav-link active" to="/add">
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
          <tr className="inv-Allproducts-table-row pti-bg-secondary_blue text-light rounded-5">
            <th className="inv-Allproducts-table-heading1 p-2">Product ID</th>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Product Quantity</th>
            <th>Product Weight</th>
            <th>Unit Price</th>
            <th>Size</th>
            <th></th>
            <th className="inv-Allproducts-table-heading2"></th>
          </tr>
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
                <td>
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
                  <button className="pti-allProducts-tble-buttons pti-allProducts-edit-buttons">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
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
        </table>
      </div>
    </div>
  );
}
