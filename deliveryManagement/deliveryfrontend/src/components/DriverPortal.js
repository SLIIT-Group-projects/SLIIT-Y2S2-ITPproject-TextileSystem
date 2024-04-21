import React,{useState,useEffect,useRef} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

export default function DriverPortal() {

    const[deliveries, setDeliveries]=useState([]);
     useEffect(()=>{
            axios.get("http://localhost:8070/delivery")
            .then((res)=>{
                setDeliveries(res.data);

            }).catch((err)=>{
                alert.apply(err.message);
            })
        },[]);

        const [searchQuery, setSearchQuery]=useState("");
        const [noResults, setNoResults]= useState(false);

        const handleSearch=(e)=>{
            e.preventDefault();
                const filteredDeliveries= deliveries.filter((delivery)=>
                Object.values(delivery).some((field)=>
                field.toString().toLowerCase().includes(searchQuery.toLowerCase())
                ))
                setDeliveries(filteredDeliveries);
                setNoResults(filteredDeliveries.length==0);
            
        }
    
    return(
        <div>
            <div className="container">
            <h1>welcome to driver portal</h1>
            <form class="d-flex" role="search">
            <input onChange={(e)=>setSearchQuery(e.target.value)} class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button onClick={handleSearch} class="btn btn-outline-info" type="submit">Search deliveries</button>
            </form>
            <br></br>

            <div className="container">
           {noResults ?(
                <div>
                    <p>No delivery found</p>
                </div>
           ): (
           <div >
            <table class="table table-delivery">
                <thead>
                    <tr className="table-del-header">
                    <th scope="col">Order Id</th>
                    <th scope="col">Driver Id</th>
                    <th scope="col">Lorry Number</th>
                    <th scope="col">Delivery Date</th>
                    <th scope="col">Delivery Status</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                {deliveries && deliveries.map((Delivery, i)=>(
                <tr className="table-del-row" key={i}>  
                        <td>{Delivery.orderId}</td>
                        <td>{Delivery.driverId}</td>
                        <td> {Delivery.vehicleNo}</td>
                        <td>{ Delivery.deliveryDate}</td>
                        <td>{ Delivery.deliveryStatus}</td>
                        <td><Link to={`/driver/delivery/update/${Delivery._id}`} className="btn action-button btn-primary"> Complete Delivery  </Link></td>
                        
                </tr>    
             

            ))}
            </tbody> 
            </table>
            </div>
            )}
            
        </div>

        </div>
           
        </div>
    )
}