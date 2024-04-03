import React,{useState,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ViewOrders(){

    const[deliveries, setDeliveries]=useState([]);
     useEffect(()=>{
            axios.get("http://localhost:8070/delivery")
            .then((res)=>{
                setDeliveries(res.data);

            }).catch((err)=>{
                alert.apply(err.message);
            })
        },[]);
    return(
        <div className="container">
            <h1>Delivery Logs</h1>
           <div className="container">
           <div class="row row-cols-1 row-cols-md-3 g-4">
            {deliveries && deliveries.map((Delivery, i)=>(
                <div key={i}>
                    
                    <div class="card">
                    <div class="card-header">
                       
                       {Delivery.orderId}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{ Delivery.driverId}</h5>
                       
                        <p class="card-text">{ Delivery.vehicleNo}</p>
                        <p class="card-text">{ Delivery.deliveryDate}</p> 
                        <Link
                      to={`/delivery/update/${Delivery._id}`}
                      className="btn btn-primary"
                    >
                      Update
                    </Link>
                        <a href="#" class="btn btn-primary">Delete</a>
                    </div>
                    <br/>
                    </div>
              </div> 
                 
            
            ))}
            </div>
        </div>
        </div>     
 
    )
}
