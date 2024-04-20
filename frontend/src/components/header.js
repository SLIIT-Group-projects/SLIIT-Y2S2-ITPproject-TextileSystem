import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export default function Header() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg  pti-bg-light_blue">
        <div class="container">
          <a class="navbar-brand pti-bolder" href="#">
            <div className="header_logo"></div>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse d-flex justify-content-center"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav gap-5 mb-2 mb-lg-0">
              <li class="nav-item">
                <a href=""
                  class="nav-link header-list cursor-pointer  pti-bold"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link header-list pti-bold"
                  href=""
                >
                  Shop
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link header-list pti-bold"
                  href=""
                >
                  Features
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link header-list pti-bold"
                  href=""
                >
                  Contact US
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link header-list pti-bold"
                  href=""
                >
                  About US
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
