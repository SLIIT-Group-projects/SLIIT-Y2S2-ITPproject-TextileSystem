import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useSelector, useDispatch } from "react-redux";

import '../css/header.css'
import '../css/main.css'
export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOut());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
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
                <a href="/"
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
                  href="/create-feedback"
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
            <ul className="d-flex gap-4 align-items-center">
          
          {currentUser ? (
            
            <div className="dropdown">
              
              <Link to="/profile" className="dropdown-toggle text-decoration-none text-white">
                <img src={currentUser.profilePicture} alt="user" className="rounded-circle" style={{ width: '3rem', height: '3rem' }} />
              </Link>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <span className="dropdown-item-text">
                    <span className="d-block text-sm">@{currentUser.username}</span>
                    <span className="d-block text-sm font-weight-medium overflow-hidden text-truncate">{currentUser.email}</span>
                  </span>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item text-dark" onClick={handleSignOut}>Sign Out</button></li>
              </ul>
            </div>
          ) : (
            <Link to='/sign-in'>
            <button className="pti-header-signin pti-bg-blue">Sign In</button>
            </Link>
            
          )}
        </ul>
          </div>
          <div>
           
          </div>
        </div>

      </nav>
    </div>
  );
}
