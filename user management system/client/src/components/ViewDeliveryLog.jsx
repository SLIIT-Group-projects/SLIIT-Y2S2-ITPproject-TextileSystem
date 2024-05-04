import React,{useState,useEffect,useRef} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import { useReactToPrint } from "react-to-print";
import DeliveryHeader from "./DeliveryHeader";

export default function ViewDeliveryLog(){

    const[deliveries, setDeliveries]=useState([]);
     useEffect(()=>{
            axios.get("http://localhost:3000/delivery")
            .then((res)=>{
                setDeliveries(res.data);

            }).catch((err)=>{
                alert.apply(err.message);
            })
        },[]);

    const history= useNavigate();
    
    const ComponentsRef= useRef();

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
        <div className="container">
            <DeliveryHeader/>
        <div className="container center">
        <form class="d-flex" role="search">
            <input onChange={(e)=>setSearchQuery(e.target.value)} class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button onClick={handleSearch} class="btn btn-outline-info" type="submit">Search deliveries</button>
        </form>
        </div>
            <h1>Delivery Logs</h1>
           <div className="container">
           {noResults ?(
                <div>
                    <p>No delivery found</p>
                </div>
           ): (
           <div >
             <div className="container" >
            <table class="table table-hover table-delivery">
                <thead className="table-delivery">
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
                        <td className="table-button"> {new Date(Delivery.deliveryDate) > new Date() ? (
                                <Link to={`/delivery/update/${Delivery._id}`} className="btn action-button btn-primary">
                                Update
                                </Link>
                            ) : (
                                <button className="btn action-button btn-primary" onClick={() => alert("You cannot update delivery details because the delivery date has passed.") }>
                                Update
                                </button>
                            )}
                            </td>
                        <td><Link to={`/delivery/delete/${Delivery._id}`} className="btn action-button btn-primary"> Delete</Link> </td>
                        <td><Link to={`/order/get/${Delivery.orderId}`} className="btn action-button btn-primary"> View Order</Link> </td>
                </tr>    
             

            ))}
            </tbody> 
            </table>
            </div>
            </div>
            )}
           
        </div>
        </div>     
 
    )
}