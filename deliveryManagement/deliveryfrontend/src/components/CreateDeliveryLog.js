import React,{useState} from "react"


export default function CreateDeliveryLog(){
    return(
        <div>
            <form>
            <div class="mb-3">
                <label for="deliveryDate" class="form-label">Delivery Date</label>
                <input type="date" class="form-control" id="deliveryDate" aria-describedby="emailHelp"></input>
             
            </div>
            <div class="mb-3">
                <label for="vehicleNumber" class="form-label">Vehicle No</label>
                <input type="password" class="form-control" id="vehicleNumber"></input>
            </div>
            <div class="mb-3">
                <label for="drieverID" class="form-label">Driver ID</label>
                <input type="text" class="form-control" id="drieverID"></input>
            </div>
            <button type="submit" class="btn btn-primary">Confirm</button>
            </form>
        </div>
    )
}
