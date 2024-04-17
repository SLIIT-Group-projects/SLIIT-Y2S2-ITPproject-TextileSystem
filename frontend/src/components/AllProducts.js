import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    function getProducts() {
      axios
        .get("http://localhost:8070/product/")
        .then((res) => {
          setProducts(res.data);
          // console.log(res)
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getProducts();
  }, []);

  // Handle delete button click
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

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Product Report",
    onafterprint: () => alert("Product Report Sccessfully Download !!"),
  });

  return (
    <div ref={ComponentsRef} className="inv-Allproducts-page container">
      <div  className="pti-text-dark pti-text-h1 pti-bold text-center pb-5 pt-3">
        INVENTORY DASHBOARD
      </div>
      <div className="d-flex justify-content-center gap-3 pb-5">
        <button className="inv-allProducts-button pti-bg-secondary_blue  pti-bold pti-rounded-small border-0 text-light pti-text-p">
          PRODUCTS
        </button>
        <button className="inv-allProducts-button pti-bg-secondary_blue  pti-bold pti-rounded-small border-0 text-light pti-text-p">
          <Link className="nav-link active" to="/material">
            MATERIALS
          </Link>
        </button>
        <button className="inv-allProducts-button pti-bg-secondary_blue  pti-bold pti-rounded-small border-0 text-light pti-text-p">
          RELEASED
        </button>
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
      <div ref={ComponentsRef}>
        <table border={0} className="inv-Allproducts-table">
          <tr className="inv-Allproducts-table-row pti-bg-secondary_blue text-light  rounded-5">
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
          {products.map((product) => (
            <tr className=" pti-bg-light_blue ">
              <td className="inv-Allproducts-table-row1 p-2">
                {product.product_ID}
              </td>
              <td>
                <img src={product.image} width={"200px"} height={"180px"} />
              </td>
              <td>{product.product_name}</td>
              <td>{product.product_description}</td>
              <td>{product.quantity}</td>
              <td>{product.weight}</td>
              <td>{product.unit_price}</td>
              <td>{product.size}</td>

              <td>
                <button className="pti-allProducts-tble-buttons pti-allProducts-edit-buttons">
                  <i class="fa-solid fa-pen-to-square"></i>
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
          ))}
        </table>
      </div>
    </div>
  );
}
