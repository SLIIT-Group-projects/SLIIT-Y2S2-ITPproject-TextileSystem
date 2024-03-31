import React,{useState,useEffect} from "react"


export default function ViewOrders(){
    return(
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                   
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Orders</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Completed</a>
                        </li>
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Delivery Log
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Pending</a></li>
                            <li><a class="dropdown-item" href="#">Completed</a></li>
                        </ul>
                        </li>
                        
                    </ul>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    </div>
                </div>
                </nav>
        </div>
    )
}
