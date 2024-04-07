import React,{useState,useEffect,useRef} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import { useReactToPrint } from "react-to-print";

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

    const history= useNavigate();
    
    const ComponentsRef= useRef();

    const handlePrint= useReactToPrint({
        content:()=>ComponentsRef.current,
        DocumentTitle: "Delivery Report",
        onafterprint:()=>alert("Delivery report successfully downloaded")
    })

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
        <div className="container" ref={ComponentsRef}>
        <form class="d-flex" role="search">
            <input onChange={(e)=>setSearchQuery(e.target.value)} class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button onClick={handleSearch} class="btn btn-outline-success" type="submit">Search deliveries</button>
        </form>
            <h1>Delivery Logs</h1>
           <div className="container">
           {noResults ?(
                <div>
                    <p>No delivery found</p>
                </div>
           ): (
           <div >
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Order Id</th>
                    <th scope="col">Driver Id</th>
                    <th scope="col">Lorry Number</th>
                    <th scope="col">Delivery Date</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                {deliveries && deliveries.map((Delivery, i)=>(
                <tr key={i}>  
                        <td>{Delivery.orderId}</td>
                        <td>{Delivery.driverId}</td>
                        <td> {Delivery.vehicleNo}</td>
                        <td>{ Delivery.deliveryDate}</td>
                        <td><Link to={`/delivery/update/${Delivery._id}`} className="btn btn-primary"> Update  </Link></td>
                        <td><Link to={`/delivery/delete/${Delivery._id}`} className="btn btn-primary"> Delete</Link> </td>
                </tr>    
             

            ))}
            </tbody> 
            </table>
            </div>
            )}
            <button onClick={handlePrint}> Download Report</button>
        </div>
        </div>     
 
    )
}