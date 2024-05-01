import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export default function AdminHeader() {
  return (
    <div>
      {/* Page header */}
      <div className="pti-text-dark pti-text-h1 pti-bold text-center pb-5 pt-3">
        INVENTORY DASHBOARD
      </div>

      {/* Navigation buttons */}
      <div className="d-flex justify-content-center gap-3 pb-5">
        <button className="inv-allProducts-button pti-bg-secondary_blue pti-bold pti-rounded-small border-0 text-light pti-text-p">
          <Link className="nav-link active" to="/inv/">
            PRODUCTS
          </Link>
        </button>
        <button className="inv-allProducts-button pti-bg-secondary_blue pti-bold pti-rounded-small border-0 text-light pti-text-p">
          <Link className="nav-link active" to="/inv/material">
            MATERIALS
          </Link>
        </button>
        <button className="inv-allProducts-button pti-bg-secondary_blue pti-bold pti-rounded-small border-0 text-light pti-text-p">
          <Link className="nav-link active" to="/inv/AllReleasedTasks">
            RELEASED
          </Link>
        </button>
        <button className="inv-allProducts-button pti-bg-secondary_blue pti-bold pti-rounded-small border-0 text-light pti-text-p">
          <Link className="nav-link active" to="/inv/request_material">
            REQUESTS
          </Link>
        </button>
      </div>
    </div>
  );
}
