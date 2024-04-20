import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

const ActivityRecord = () => {
  const empty = {
    name: "",
    phoneNo: "",
    date: "",
    month: "",
    activityType: "",
    amount: ""
  };

  const [data, setData] = useState([]);
  const [editBoxshow, setEditBoxShow] = useState(false);
  const [editActivityState, setEditActivityState] = useState(empty);
  const [idget, setIdget] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [search, setSearch] = useState("");


  //filter data based on search
  const filteredData = data.filter((elem) => {
    return elem.name.toLowerCase().includes(search.toLowerCase());
  });

  const handleClick = (event) => {
    const { name, value } = event.target;
    setEditActivityState({ ...editActivityState, [name]: value });
  };

  const dataFetch = async () => {
    try {
      const response = await fetch(`http://localhost:4000/activityget`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const dataFetch = await response.json();
      setData(dataFetch);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  const deleteActivity = async (id) => {
    await fetch(`http://127.0.0.1:4000/activityget/${id}`, {
      method: "DELETE",
    });
    dataFetch();
  };

  const editActivity = async (id) => {
    let dataGet = await fetch(`http://127.0.0.1:4000/activityget/${id}`);
    dataGet = await dataGet.json();
    setEditActivityState(dataGet);
    setIdget(id);
    setEditBoxShow(true);
  };

  const updateActivityBtn = async () => {
    let idtoUpdate = idget;
    await fetch(`http://127.0.0.1:4000/activityedit/${idtoUpdate}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editActivityState),
    });
    dataFetch();
    setEditActivityState(empty);
    setEditBoxShow(false);
  };

  const generateReport = () => {
    // Calculate total amount
    const total = data.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    setTotalAmount(total);

    const doc = new jsPDF();
    let yPos = 10;
    let memberNo = 1; // Initialize member number

    // Add total amount as header
    doc.setFontSize(18);
    doc.text(`Total Amount: ${total}`, 10, yPos);
    yPos += 20;

    // Add members' names and numbers
    data.forEach((elem) => {
      // Add member number and name
      doc.text(`Member ${memberNo}: ${elem.name}`, 10, yPos);
      // Add amount
      doc.text(`Amount: ${elem.amount}`, 100, yPos);
      yPos += 10;
      memberNo++; // Increment member number
    });

    // Save the PDF
    doc.save("activity_report.pdf");
  };

  return (
    <>
      <div className="row">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center text-white">Payment Records</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <div class="input-group mb-3">
              <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="button-search"
                onChange={(e) => {
                  setSearch(e.target.value);
                }} />
              <button className="btn btn-outline-secondary" type="button" id="button-search"> Search &nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                  <path d="M10.832 9.518a6.5 6.5 0 1 0-1.314 1.314l3.274 3.274a.5.5 0 0 0 .707-.707l-3.274-3.274zm-4.332 0a4.5 4.5 0 1 1 1.314-1.314l-3.274-3.274a.5.5 0 0 1 .707-.707l3.274 3.274zM7 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="col-4"></div>
        </div>
        {search.length > 0 && (
          <div className="row">
            <div className="col-12">
              <h6 className="text-center text-white">Search Results for {search}</h6>
            </div>
          </div>
        )}
      </div>
      <div className="row m-auto mt-2 text-white bg-dark">
        {filteredData.length === 0 ? (
          <div className="text-Primary flex items-center justify-center text-3xl">
            No Payment records available
          </div>
        ) : (
          filteredData.map((elem) => (
            <div className="col-4" key={elem._id}>
              <div className="cardA mt-3">
                <div className="cardA__content">
                  <h1>Salary Details:</h1>
                  <div className="cardA__content-heading mt-3">
                    <p>{elem.activityType}</p>
                  </div>
                  <div className="cardA__content-body">
                    <h3>Name:</h3><p>{elem.name}</p>
                    <h3>Phone No:</h3><p>{elem.phoneNo} </p>
                    <h3>Payment Date:</h3><p>{elem.date}</p>
                    <h3>Month:</h3><p>{elem.month}</p>
                    <h3>Salary:</h3><p>{elem.amount}</p>
                  </div>
                  <div className="cardA__content-footer m-auto">

                    {sessionStorage.getItem('isAdmin') === "true" && (
                      <>
                        <button onClick={() => editActivity(elem._id)} className="btnA"> Edit
                        </button>
                        <button className="btnA" onClick={() => deleteActivity(elem._id)}> Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div>
        <button onClick={() => { generateReport(); setEditBoxShow(!editBoxshow); }}>Generate Report</button>
      </div>
      {editBoxshow && (
        <div className="bg-dark text-white">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-red-800 p-2 space-y-4 sm:w-1/2 w-4/12 absolute lg:left-1/4 lg:top-1/4 sm:left-1/3 sm:top-1/4 top-1/4 left-1/3 text-white"
          >
            <h2 className="text-center sm:text-3xl text-xl">Edit Payment Log</h2>
            <input
              className="border border-white w-full p-0.5"
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleClick}
              value={editActivityState.name}
            />
            <input
              className="border border-white w-full p-0.5"
              type="number"
              name="phoneNo"
              placeholder="Phone no"
              onChange={handleClick}
              value={editActivityState.phoneNo}
            />
            <input
              className="border border-white w-full p-0.5"
              type="date"
              name="date"
              onChange={handleClick}
              value={editActivityState.date}
            />

            <select
              className="border border-white w-full p-0.5"
              name="month"
              onChange={handleClick}
              value={editActivityState.month}
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


            <select
              className="border border-white w-full p-0.5"
              name="activityType"
              onChange={handleClick}
              value={editActivityState.activityType}
            >
              <option className="text-gray-300 text-white bg-dark">Job Role</option>
              <option className="text-white bg-dark">CEO</option>
              <option className="text-white bg-dark">HR Manager</option>
              <option className="text-white bg-dark">Developer</option>
              <option className="text-white bg-dark">Designer</option>
              <option className="text-white bg-dark">Tester</option>
              <option className="text-white bg-dark">Intern</option>
            </select>
            <input
              className="border border-white w-full p-0.5"
              type="number"
              name="amount"
              placeholder="Salary"
              onChange={handleClick}
              value={editActivityState.amount}
              disabled
            />

            <div className="flex justify-center mt-3">
              <button
                className="bg-white p-3 rounded-full text-red-800 font-bold hover:bg-black"
                onClick={updateActivityBtn}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}




    </>
  );
};

export default ActivityRecord;






