import React,{useState} from "react"
import axios from "axios"

export default function CreateDeliveryLog(){
    const [deliveryDate, setDate]= useState("");
    const [orderId, setOrderId]= useState("");
    const [vehicleNo, setVehicleNumber]= useState("");
    const [driverId, setDriverId]= useState("");
    
    function sendDeliveryDetails(e){
        e.preventDefault();
        
        const newDeliveryLog= {
            orderId,
            deliveryDate,
            vehicleNo,
            driverId
        }

        axios.post("http://localhost:8070/delivery/add",newDeliveryLog)
        .then(()=>{
            alert("Delivery log created")
        }).catch((err)=>{
            alert(err)
        })
    } 
    return(
        <div className="container">
            <form onSubmit={sendDeliveryDetails}>
            <div className="container">
                <label for="deliveryDate" class="form-label">Delivery Date</label>
                <input type="date" onChange={(e)=>{
                    setDate(e.target.value);}} 
                    class="form-control" id="deliveryDate" aria-describedby="emailHelp"></input>
             
            </div>
            <div class="mb-3">
                <label for="orderId" class="form-label">Order Id:</label>
                <input type="text" onChange={(e)=>{setOrderId(e.target.value);}} class="form-control" id="orderId"></input>
            </div>
            <div class="mb-3">
                <label for="vehicleNumber" class="form-label">Vehicle No</label>
                <input type="text" onChange={(e)=>{setVehicleNumber(e.target.value);}} class="form-control" id="vehicleNumber"></input>
            </div>
            <div class="mb-3">
                <label for="drieverID" class="form-label">Driver ID</label>
                <input type="text" onChange={(e)=>{setDriverId(e.target.value);}} class="form-control" id="drieverID"></input>
            </div>
            <button type="submit" class="btn btn-primary" >Confirm</button>
            
            </form>
        </div>
    )
}
