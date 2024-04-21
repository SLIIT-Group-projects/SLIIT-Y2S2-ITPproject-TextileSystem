import React,{useState,useEffect} from "react"
import DriverPortal from "./DriverPortal"
import { Link } from "react-router-dom";

export default function DeliveryHeader(){
    return(
        <div className="container">
            <div className="pti-text pti-text-h1  text-center pb-5 pt-3">
                DELIVERY DASHBOARD
            </div>
            <div className="d-flex justify-content-center gap-3 pb-5">
                <Link  className='btn del-button btn-primary' to={'/order/'}>orders</Link>
                <Link  className='btn del-button btn-primary' to={'/delivery/'}>Delivery log</Link>
                <Link  className='btn del-button btn-primary' to={'/driver/delivery/'}>Driver Portal</Link>
                <Link  className='btn del-button btn-primary' to={'/delivery/download'}>Download</Link>
                <Link  className='btn del-button btn-primary' to={'/lorry/'}>Lorry</Link>

                </div>
            
        </div>
    )
}
