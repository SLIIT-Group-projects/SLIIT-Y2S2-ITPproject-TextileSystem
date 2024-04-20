/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ActivityForm = () => {


  const empty = {
    name: "",
    phoneNo: "",
    date: "",
    month: "",
    activityType: "",
    amount: ""
  };
  const [sessionEmail, setsessionEmail] = useState(null);
  const getSessionEmail = () => {
    setsessionEmail(sessionStorage.getItem("useremail"));
  };
  useEffect(() => {
    getSessionEmail();
  }, []);
  const navigate = useNavigate();
  const [addActivity, setAddActivity] = useState(empty);

  const handleClick = (event) => {
    const { name, value } = event.target;
    setAddActivity({ ...addActivity, [name]: value, email: sessionEmail })
  }

  const addActivityBtn = async () => {
    if (addActivity.name === "" || addActivity.activityType === "" || addActivity.phoneNo === "" || addActivity.date === "" || addActivity.month === "" || addActivity.amount === "") {
      alert("please Enter Data in All fields!")
    }
    else {
      await fetch("http://127.0.0.1:4000/activitypost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addActivity),
      });
      alert("Activity added");
      setAddActivity(empty);
      navigate("/dashboard/activities")
    }
  };

  const [basicSalary, setBasicSalary] = useState(0);
  const [bonusAllocation, setBonusAllocation] = useState("");
  const [leaves, setLeaves] = useState(0);
  const [OThours, setOThours] = useState(0);
  const [taxDeductions, setTaxDeductions] = useState(0);

  useEffect(() => {
    let salary;
    salary = basicSalary;

    if (bonusAllocation === "Yes") {
      salary = parseInt(salary) + 10000;
    }

    if (leaves <= 3 && leaves > 0) {
      salary = parseInt(salary) - (leaves * 600);
    }

    if (leaves <= 5 && leaves > 3) {
      salary = parseInt(salary) - ((leaves - 3) * 800) - 1800;
    }

    if (addActivity.activityType === "HR Manager") {
      salary = parseInt(salary) + (OThours * 500);
    }
    else if (addActivity.activityType === "CEO") {
      salary = parseInt(salary) + (OThours * 1000);
    }
    else if (addActivity.activityType === "Developer") {
      salary = parseInt(salary) + (OThours * 300);
    }
    else if (addActivity.activityType === "Designer") {
      salary = parseInt(salary) + (OThours * 200);
    }
    else if (addActivity.activityType === "Tester") {
      salary = parseInt(salary) + (OThours * 400);
    }
    else if (addActivity.activityType === "Intern") {
      salary = parseInt(salary) + (OThours * 100);
    }

    if (basicSalary > 1199999) {
      setTaxDeductions(salary * 0.24);
      salary = salary - (salary * 0.24);
    }
    else if (basicSalary > 999999) {
      setTaxDeductions(salary * 0.21);
      salary = salary - (salary * 0.21);
    }
    else if (basicSalary > 899999) {
      setTaxDeductions(salary * 0.2);
      salary = salary - (salary * 0.2);
    }
    else if (basicSalary > 799999) {
      setTaxDeductions(salary * 0.19);
      salary = salary - (salary * 0.19);
    }
    else if (basicSalary > 699999) {
      setTaxDeductions(salary * 0.17);
      salary = salary - (salary * 0.17);
    }
    else if (basicSalary > 599999) {
      setTaxDeductions(salary * 0.15);
      salary = salary - (salary * 0.15);
    }
    else if (basicSalary > 499999) {
      setTaxDeductions(salary * 0.13);
      salary = salary - (salary * 0.13);
    }
    else if (basicSalary > 399999) {
      setTaxDeductions(salary * 0.11);
      salary = salary - (salary * 0.11);
    }
    else if (basicSalary > 299999) {
      setTaxDeductions(salary * 0.9);
      salary = salary - (salary * 0.9);
    }
    else if (basicSalary > 199999) {
      setTaxDeductions(salary * 0.07);
      salary = salary - (salary * 0.07);
    }
    else if (basicSalary > 99999) {
      setTaxDeductions(salary * 0.05);
      salary = salary - (salary * 0.05);
    }
    else if (basicSalary < 99999) {
      setTaxDeductions(0);
    }

    setAddActivity({ ...addActivity, amount: salary, email: sessionEmail })
  }, [basicSalary, bonusAllocation, leaves, addActivity.activityType, OThours, taxDeductions]);
  return (
    <>
      <div className="w-screen h-screen bg-gray-900 text-white bg-dark flex justify-center items-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="form p-5 space-y-4 sm:w-1/2 w-4/12 bg-opacity-50 rounded-2xl border-red-800"
        >
          <h2 className="text-center text-3xl font-bold">Add Payment</h2>
          <input
            className="border-b-2 border-red-800 w-full h-10 mr"
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleClick}
            value={addActivity.name}
          />
          &nbsp;&nbsp;&nbsp;
          <input
            className="border-b-2 border-red-800 w-full h-10"
            type="number"
            name="phoneNo"
            min="1"
            placeholder="Phone no"
            onChange={handleClick}
            value={addActivity.phoneNo}
          />
          &nbsp;&nbsp;&nbsp;
          <input
            className="border-b-2 border-red-800 w-full h-10"
            type="date"
            name="date"
            onChange={handleClick}
            value={addActivity.date}
          />
          &nbsp;&nbsp;&nbsp;
          <select
            className="border-b-2 border-red-800 w-full h-10"
            name="month"
            onChange={handleClick}
            value={addActivity.month}
          >
            <option className="text-gray-300 text-white bg-dark">Month</option>
            <option className="text-white bg-dark">Jan</option>
            <option className="text-white bg-dark">Feb</option>
            <option className="text-white bg-dark">March</option>
            <option className="text-white bg-dark">April</option>
            <option className="text-white bg-dark">May</option>
            <option className="text-white bg-dark">June</option>
            <option className="text-white bg-dark">July</option>
            <option className="text-white bg-dark">Aug</option>
            <option className="text-white bg-dark">Sep</option>
            <option className="text-white bg-dark">Oct</option>
            <option className="text-white bg-dark">Nov</option>
            <option className="text-white bg-dark">Dec</option>
          </select>
          &nbsp;&nbsp;&nbsp;
          <select
            className="border-b-2 border-red-800 w-full h-10"
            name="activityType"
            onChange={handleClick}
            value={addActivity.activityType}
          >
            <option className="text-gray-300 text-white bg-dark">Job Role</option>
            <option className="text-white bg-dark">HR Manager</option>
            <option className="text-white bg-dark">CEO</option>
            <option className="text-white bg-dark">Developer</option>
            <option className="text-white bg-dark">Designer</option>
            <option className="text-white bg-dark">Tester</option>
            <option className="text-white bg-dark">Intern</option>
          </select>
          &nbsp;&nbsp;&nbsp;
          <input
            className="border-b-2 border-red-800 w-full h-10"
            type="number"
            name="amount"
            min="1"
            placeholder="Salary"
            onChange={handleClick}
            value={addActivity.amount}
            disabled
            required
          />

          <div className="flex justify-center mt-5">
            <button
              className="bg-red-800 bg-dark text-white p-3 rounded-full font-bold hover:bg-black"
              onClick={addActivityBtn}
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <hr />
      <div classsName="row">
        <div classsName="row">
          <div className="col-12">
            <h3 className="text-center text-white">Salary Calculator</h3>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-1"></div>
          <div className="col-2">
            <h5 className="text-center text-white">Basic Salary</h5>
            <div className="p-2">
              <input type="text" className="form-control" placeholder="Enter basic salary"
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  setBasicSalary(e.target.value);
                }} />
            </div>
            <br />
          </div>
          <div className="col-2">
            <h5 className="text-center text-white">Bonus Allocation</h5>
            <div className="p-2">
              <select className="form-select" onChange={(e) => setBonusAllocation(e.target.value)}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div className="col-2">
            <h5 className="text-center text-white">Leaves</h5>
            <div className="p-2">
              <select className="form-select" onChange={(e) => setLeaves(parseInt(e.target.value))}>
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className="col-2">
            <h5 className="text-center text-white">Over Time (OT)</h5>
            <div className="p-2">
              <input type="text" className="form-control" placeholder="Enter OT hours"
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  setOThours(e.target.value);
                }} />
            </div>
          </div>
          <div className="col-2">
            <h5 className="text-center text-white">Tax Deductions</h5>
            <div className="p-2">
              <input type="text" className="form-control" placeholder="Tax Deductions"
                value={taxDeductions}
                readOnly
              />
            </div>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </>
  );



};

export default ActivityForm;
