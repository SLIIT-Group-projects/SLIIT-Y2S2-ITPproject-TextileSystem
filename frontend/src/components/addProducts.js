import React, { useState } from "react";
import axios from "axios";

function AddProducts() {
  const [product_ID, setID] = useState("");
  const [product_name, setName] = useState("");
  const [product_description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [unit_price, setPrice] = useState("");
  const [size, setSize] = useState("");

  function sendData(e) {
    e.preventDefault();
    const newProduct = {
        product_ID,
        product_name,
        product_description,
        quantity,
        weight,
        unit_price,
        size
    };
    axios
      .post("http://localhost:8070/product/add", newProduct)
      .then(() => {
        alert("Student Added");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
      <form onSubmit={sendData}>
        <div class="mb-3 d-flex flex-column align-items-start">
          <div class="form-label">
            Product ID
          </div>
          <input
            type="text"
            class="form-control"
            id="id"
            onChange={(e) => {
              setID(e.target.value);
            }}
          />
        </div>
        <div class="mb-3 d-flex flex-column align-items-start">
          <label for="age" class="form-label">
            Student Name
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div class="mb-3 d-flex flex-column align-items-start">
          <label for="name" class="form-label">
            product description
          </label>
          <input
            type="text"
            class="form-control"
            id="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div class="mb-3 d-flex flex-column align-items-start">
          <label for="name" class="form-label">
            Quantity
          </label>
          <input
            type="text"
            class="form-control"
            id="quantity"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
        <div class="mb-3 d-flex flex-column align-items-start">
          <label for="name" class="form-label">
            weight
          </label>
          <input
            type="text"
            class="form-control"
            id="weight"
            onChange={(e) => {
              setWeight(e.target.value);
            }}
          />
        </div>
        <div class="mb-3 d-flex flex-column align-items-start">
          <label for="name" class="form-label">
            unit price
          </label>
          <input
            type="text"
            class="form-control"
            id="unit_price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div class="mb-3 d-flex flex-column align-items-start">
          <label for="name" class="form-label">
            Size
          </label>
          <input
            type="text"
            class="form-control"
            id="size"
            onChange={(e) => {
              setSize(e.target.value);
            }}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProducts;
