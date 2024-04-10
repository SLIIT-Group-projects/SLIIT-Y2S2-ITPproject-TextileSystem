import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  return (
    <div className="inv-Allproducts-page container">
      <div className="pti-text-dark pti-text-h1 pti-bold text-center pb-5 pt-3">INVENTORY DASHBOARD</div>
      <div className="d-flex justify-content-center gap-3 pb-5">
        <button className="inv-allProducts-button pti-bg-secondary_blue  pti-bold pti-rounded-small border-0 text-light pti-text-p">PRODUCTS</button>
        <button  className="inv-allProducts-button pti-bg-secondary_blue  pti-bold pti-rounded-small border-0 text-light pti-text-p"><Link className="nav-link active" to="/material">MATERIALS</Link></button>
        <button className="inv-allProducts-button pti-bg-secondary_blue  pti-bold pti-rounded-small border-0 text-light pti-text-p">RELEASED</button>
      </div>
      <div className="d-flex justify-content-between">
        <div className="pti-text-h2 pti-bold text-black">PRODUCTS</div>
        <div>
          <button className="pti-bg-black p-2 text-light pti-rounded-small pti-bold" ><Link className="nav-link active" to="/add">ADD PRODUCT</Link></button>
        </div>
      </div>
      <table border={0} className="inv-Allproducts-table">
        <tr className="inv-Allproducts-table-row pti-bg-secondary_blue text-light  rounded-5">
          <th className="inv-Allproducts-table-heading1 p-2">Product ID</th>
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
              <td className="inv-Allproducts-table-row1 p-2">{product.product_ID}</td>
              <td>{product.product_name}</td>
              <td>{product.product_description}</td>
              <td>{product.quantity}</td>
              <td>{product.weight}</td>
              <td>{product.unit_price}</td>
              <td>{product.size}</td>

              <td ><button className="pti-allProducts-tble-buttons pti-allProducts-edit-buttons"><i class="fa-solid fa-pen-to-square"></i></button></td>
              <td  className="inv-Allproducts-table-row2"><button className="pti-allProducts-tble-buttons pti-allProducts-delete-buttons"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
          ))}
      </table>
    </div>
  );
}
