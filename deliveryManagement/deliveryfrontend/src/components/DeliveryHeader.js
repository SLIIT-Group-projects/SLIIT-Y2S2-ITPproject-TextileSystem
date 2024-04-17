import React,{useState,useEffect} from "react"
import DriverPortal from "./DriverPortal"

export default function DeliveryHeader(){
    return(
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                   
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/order/">Orders</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="/delivery/">Delivery log</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="/driver/delivery/">Drivery portal</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="/delivery/download">Download Delivery Schedule</a>
                        </li>
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Delivery Log
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="">Pending</a></li>
                            <li><a class="dropdown-item" href="#">Completed</a></li>
                        </ul>
                        
                        </li>
                        
                    </ul>
                    
                    </div>
                </div>
                </nav>
        </div>
    )
}