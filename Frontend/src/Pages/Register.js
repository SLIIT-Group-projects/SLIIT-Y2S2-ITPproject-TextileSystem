import React, { useState } from 'react'
import Navbar from '../Component/Navbar'
import './LoginReg.css'
import { Link, useNavigate } from 'react-router-dom'
const Register = () => {


  const empty = {
    name: "",
    email: "",
    password: "",
    isAdmin: "",
  };
  const navigate = useNavigate();
  const [singupInputs, setSignUpInputs] = useState(empty);
  const handleClick = (event) => {
    const { name, value } = event.target;
    setSignUpInputs({ ...singupInputs, [name]: value });
  };
  // console.log(singupInputs);
  const userDetails = async () => {
    if (
      singupInputs.name === "" ||
      singupInputs.email === "" ||
      singupInputs.password === "" ||
      singupInputs.isAdmin === ""
    ) {
      alert("please enter data in all fields");
    } else {
      let record = await fetch("http://127.0.0.1:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(singupInputs),
      });
      record = await record.json();
      if (record === "email already exists") {
        alert("email already exists!");
      } else {
        setSignUpInputs(empty);
        alert("Signed Up Successfully!");
        navigate("/login");
      }
    }
  };


  return (
    <>
      <Navbar />

      <div className='bg-img'>
        <div className="login-box mt-5">
          <p>Sign Up</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="user-box">
              <input required name="name" type="text" onChange={handleClick} value={singupInputs.name} />
              <label>Name</label>
            </div>
            <div className="user-box">
              <input required name="email" type="email" onChange={handleClick} value={singupInputs.email} />
              <label>Email</label>
            </div>
            <div className="user-box">
              <input required name="password" type="password" onChange={handleClick} value={singupInputs.password} />
              <label>Password</label>
            </div>
            <div className="user-box">
              <div className="p-2" >
                <label htmlFor="isAdmin">Admin User?</label>
                <select id="isAdmin" name="isAdmin" onChange={handleClick} value={singupInputs.isAdmin} style={{ width: '120px', backgroundColor: "black", color: "white" }}>
                  <option value="">Select</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
            </div>
            <Link onClick={userDetails} >
              <span />
              <span />
              <span />
              Submit
            </Link>
          </form>
          <p>Do you have an account? <Link to='/login' className="a2">Login</Link></p>
        </div>
      </div>
    </>
  )
}

export default Register;
