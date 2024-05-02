
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import '../css/home.css'

export default function Footer() {
  return (
    <div className="footer">
      <section className="footer pti-bg-light_blue">
        <div className="container">
            <div>
                <div className="footer-logo"></div>
                <div className="footer-test">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec nulla metus. Nulla facilisi.  </div>
                <div></div>
            </div>
            <div></div>
            <div></div>
            <div></div>
        </div>
      </section>
    </div>
  );
}
