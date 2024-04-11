import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllMaterials() {
  const [materails, setMaterials] = useState([]);
  useEffect(() => {
    function getMaterials() {
      axios
        .get("http://localhost:8070/material/")
        .then((res) => {
            setMaterials(res.data);
          // console.log(res)
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getMaterials();
  }, []);

  return (
    <div className="inv-Allproducts-page container">
      <div className="pti-text-dark pti-text-h1 pti-bold text-center pb-5 pt-3">INVENTORY DASHBOARD</div>
      <div className="d-flex justify-content-center gap-3 pb-5">
        <button className="inv-allProducts-button pti-bg-secondary_blue  pti-bold pti-rounded-small border-0 text-light pti-text-p"><Link className="nav-link active" to="/">PRODUCTS</Link></button>
        <button to="/add" className="inv-allProducts-button pti-bg-secondary_blue  pti-bold pti-rounded-small border-0 text-light pti-text-p"><Link className="nav-link active" to="/material">MATERIALS</Link></button>
        <button className="inv-allProducts-button pti-bg-secondary_blue  pti-bold pti-rounded-small border-0 text-light pti-text-p">RELEASED</button>
      </div>
      <div className="d-flex justify-content-between">
        <div className="pti-text-h2 pti-bold text-black">MATERIALS</div>
        <div>
          <button className="add-product-btn pti-bg-black p-2 text-light pti-rounded-small pti-bold"><Link className="nav-link active" to="/material/add">ADD MATERIAL</Link></button>
        </div>
      </div>
      <table border={0} className="inv-Allproducts-table">
        <tr className="inv-Allproducts-table-row pti-bg-secondary_blue text-light  rounded-5">
          <th className="inv-Allproducts-table-heading1 p-2">Material ID</th>
          <th>Material Name</th>
          <th>Material type</th>
          <th>Roll Quantity</th>
          <th>Material colour</th>
          
          <th></th>
          <th className="inv-Allproducts-table-heading2"></th>
        </tr>
          {materails.map((material) => (
            <tr className=" pti-bg-light_blue ">
              <td className="inv-Allproducts-table-row1 p-2">{material.material_ID }</td>
              <td>{material.material_name}</td>
              <td>{material.material_type}</td>
              <td>{material.roll_quantity }</td>
              <td>{material.color }</td>
              

              <td ><button className="pti-allProducts-tble-buttons pti-allProducts-edit-buttons"><i class="fa-solid fa-pen-to-square"></i></button></td>
              <td  className="inv-Allproducts-table-row2"><button className="pti-allProducts-tble-buttons pti-allProducts-delete-buttons"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
          ))}
      </table>
    </div>
  );
}
