import React,{useState,useEffect} from "react"
import DriverPortal from "./DriverPortal"

export default function DeliveryHeader(){
    return(
        <div className="container">
            <div className="pti-text pti-text-h1  text-center pb-5 pt-3">
                DELIVERY DASHBOARD
            </div>
            <div className="d-flex justify-content-center gap-3 pb-5">
                <button type='button' className='btn del-button btn-primary'> <a class="nav-link active" aria-current="page" href="/order/">Orders</a></button>
                <button className='btn del-button btn-primary'><a class="nav-link" href="/delivery/">Delivery log</a></button>
                <button className='btn del-button btn-primary'><a class="nav-link" href="/driver/delivery/">Drivery portal</a></button>
                <button className='btn del-button btn-primary'> <a class="nav-link" href="/delivery/download">Download</a></button>
                <button className='btn del-button btn-primary'><a class="nav-link" href="/lorry/">Lorry</a></button>
            </div>
            
        </div>
    )
}
