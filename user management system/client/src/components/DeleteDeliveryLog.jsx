import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import DeliveryHeader from "./DeliveryHeader";
import AdminMainHeader from '../components/Header'
export default function UpdateDeliveryLog() {
    const { id } = useParams();
    const navigate = useNavigate()

    const [delivery, setDelivery] = useState({
        orderId: "",
        deliveryDate: "",
        vehicleNo: "",
        driverId: ""
    });

    const deleteHandler= async()=>{
        await axios.delete(`http://localhost:3000/delivery/delete/${id}`)
        .then(res =>res.data)
        .then(()=>navigate("/"))
        .then(()=>navigate("/ViewDeliveryLog"))
        .catch((err) => {
            console.error("Cannot delete:", err);
        });
    }
    useEffect(() => {
        axios.get(`http://localhost:3000/delivery/get/${id}`)
            .then((res) => {
                setDelivery(res.data.delivery);
            })
            .catch((err) => {
                console.error("Error fetching delivery:", err);
            });
    }, [id]);

    
    return (
        <div><AdminMainHeader/>
        <div className="container">
            <DeliveryHeader/>
            <h1>Delete Delivery Log</h1>
            <form onSubmit={deleteHandler}>
            <div className="container">
                <div className="d-inline-flex p-2 form-controllers">
                    <label htmlFor="deliveryDate" className="form-label del-labels">Delivery Date</label>
                    <input type="date" id="deliveryDate" name="deliveryDate" value={delivery.deliveryDate} className="del-form form-control" />
                </div>
                <div className="d-inline-flex p-2 ">
                    <label htmlFor="orderId" className="form-label del-labels">Order Id:</label>
                    <input type="text" id="orderId" name="orderId" value={delivery.orderId}  className="del-form form-control" />
                </div>
            </div>
            <div className="container">
                <div className="d-inline-flex p-2 form-controllers">
                    <label htmlFor="vehicleNumber" className="form-label del-labels">Vehicle No</label>
                    <input type="text" id="vehicleNumber" name="vehicleNo" value={delivery.vehicleNo} className="del-form form-control" />
                </div>
                <div className="d-inline-flex p-2 ">
                    <label htmlFor="driverID" className="form-label del-labels">Driver ID</label>
                    <input type="text" id="driverID" name="driverId" value={delivery.driverId}  className="del-form form-control" />
                </div>
            </div>
                <button type="submit" className="btn action-button btn-primary">Delete</button>
            </form>
            <Link to={'/delivery/'}>
            <button type="submit" className="btn cancel">Cancel</button>
            </Link>
        </div>

    </div>
    );
}
