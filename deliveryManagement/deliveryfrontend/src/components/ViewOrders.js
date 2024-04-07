import React,{useState,useEffect} from "react";
import axios from "axios";

export default function ViewOrders(){

    const[orders, setOrders]=useState([]);
     useEffect(()=>{
            axios.get("http://localhost:8070/order")
            .then((res)=>{
                setOrders(res.data);

            }).catch((err)=>{
                alert.apply(err.message);
            })
        },[]);
    return(
        <div className="container">
            <h1>Orders</h1>
           <div className="container">
           <div class="row row-cols-1 row-cols-md-3 g-4">
            {orders && orders.map((Order, i)=>(
                <div key={i}>
                    
                    <div class="card">
                    <div class="card-header">
                       
                       {Order.customerCode}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{ Order.orderId}</h5>
                        <p class="card-text">{ Order.deliveryAddress}</p>
                        <p class="card-text">{ Order.quantity}</p> 
                        <a href="/delivery/add/${Order.orderId}" class="btn btn-primary">Create  Delivery Log</a>
                        
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
