import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Header from "./MainHeader";
import Footer from "./footer";

export default function Home() {
  return (
    <div>
      <Header />

      {/* section 1 */}
      <section className="pti-bg-light_blue">
        <div className="container d-flex justify-content-between">
          <div className="d-flex flex-column justify-content-center  gap-5">
            <div className="home-sec1-header pti-text-dark pti-bold ">
              Discover and <br /> Find Your Own <br /> Fashion!
            </div>
            <div className="pt-text-h3 pti-text-dark">
              Explore our curated collection of stylish clothing and accessories
              tailored to your unique taste.
            </div>
            <div>
              <button className="home-sec1-button pti-bg-secondary_blue pti-text-light border-0 pti-rounded-small">
                EXPORE NOW
              </button>
            </div>
          </div>
          <div className="home-section-1"></div>
        </div>
      </section>
      {/* section 2 */}
      <section>
        <div className="container">
          <div className="pti-text-medium pti-text-dark pti-bold text-center pt-5">
            Best Selling
          </div>
          <div className="pti-text-dark pti-bold text-center pb-5">
            Get in on the trend with our curated selection of best-selling
            styles.
          </div>
          <div className="d-flex gap-3">
            <div>
              <div className="home-sec2-img1"></div>
              <div className="d-flex flex-column gap-2 text-center">
                <div className="pti-bold pt-2">Mechanic Suits</div>
                <div>RS 5149.00 | 5.0</div>
              </div>
            </div>
            <div>
              <div className="home-sec2-img2"></div>
              <div className="d-flex flex-column gap-2 text-center">
                <div className="pti-bold pt-2">Craft Suits</div>
                <div>RS 5449.00 | 5.0</div>
              </div>
            </div>
            <div>
              <div className="home-sec2-img3"></div>
              <div className="d-flex flex-column gap-2 text-center">
                <div className="pti-bold pt-2">Security Suits</div>
                <div>RS 6149.00 | 5.0</div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>
      {/* section 3 */}
      <section className="pt-5 pb-5">
        <div className="container d-flex justify-content-center">
          <div className="home-sec3-box d-flex justify-content-around pti-rounded-small">
            <div className="home-sec3-img"></div>
            <div className="d-flex flex-column gap-4">
              <div className="pti-text-medium pti-text-dark pti-bold text-center pt-5">
                Exclusive Offer
              </div>
              <div className="home-sec3-para p-3 pti-text-dark">
                Don't miss out on this exclusive opportunity! For a limited
                time, we're offering an incredible deal that you won't find
                anywhere else. Whether you're a new customer or a returning one,
                there's something special waiting just for you.
              </div>
              <div className="d-flex gap-3 justify-content-center">
                <div className="home-sec3-img1"></div>
                <div className="home-sec3-img2"></div>
                <div className="home-sec3-img3"></div>
              </div>
              <div className="w-100 d-flex justify-content-center">
                <button className="home-sec3-button pti-bg-secondary_blue pti-text-light pti-bold pti-rounded-small border-0">ORDER NOW</button>
              </div>
            </div>
          </div>
        </div>
      </section>



      <Footer />
    </div>
  );
}
