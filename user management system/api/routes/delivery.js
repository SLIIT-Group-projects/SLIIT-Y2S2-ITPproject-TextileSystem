import express from "express";
import Delivery from "../models/delivery.js";
import Order from "../models/order.js"; // Import the Order model
import nodeMailer from 'nodemailer';

const router = express.Router();
// Add a delivery log
router.route("/add").post(async (req, res) => {
    const { deliveryDate, orderId, vehicleNo, driverId,pin } = req.body;

    try {
        const existingDelivery = await Delivery.findOne({ orderId });
        if (existingDelivery) {
            return res.status(400).json({ status: "Error", message: "Delivery already exists for this order" });
        }
        // Create a new delivery
        const newDelivery = new Delivery({
            orderId,
            deliveryDate,
            vehicleNo,
            driverId,
            deliveryStatus:'pending',
            pin,

        });

        // Save the new delivery log
        await newDelivery.save();

        // Update the associated order with the new delivery log
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ status: "Error", message: "Order not found" });
        }

        order.deliveries.push(newDelivery._id); // Add the delivery log reference to the order
        await order.save();

        const emailHTML = `
            <p>Dear customer,</p>
            <p>Your order has confirmed & delivery has been scheduled. Please enter the PIN number to the delivery device when collecting the order.</p>

            <h4 className="" style="{font-weight:bold}">Delivery Detail Confirmation</h4>
            
            Order ID: ${orderId}<br/>
            Delivery Date: ${deliveryDate}<br/>
            Vehicle Number: ${vehicleNo}<br/>
            Driver ID: ${driverId}<br/>
            Pin: ${pin}<br/>

            Contact us for any inquiry.<br/>
            Thank you<br/>
            PTI team<br/>
            0711497951<br/>
        `;

        // Create transporter
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: "ptiproject2024@gmail.com",
                pass: "gdgj szjg nkth pmxe"
            }
        });

        const mailOptions = {
            from: 'ptiproject2024@gmail.com',
            to: 'silunirupasinghe@gmail.com',
            subject: "Delivery Update", 
            html: emailHTML
          };  

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              res.status(500).json({ message: 'Error sending email' });
            } else {
              console.log('Email sent: ' + info.response);
           }
          });

       
        res.json({ message: "Delivery added and associated with order" });
    } catch (err) {
        console.error("Error adding delivery:", err);
        res.status(500).json({ status: "Error", message: "Failed to add delivery" });
    }
    
});




//view delivery log
router.route("/").get((req,res)=>{
    Delivery.find().then((delivery)=>{
        res.json(delivery)
    }).catch((err)=>{
        console.log(err)
    })

})

//update delivery(put or post can be used)
router.route("/update/:id").put(async(req,res)=>{
    let deliveryId=req.params.id;
    //const name=req.body.age;  if the below function is not using use this
    const {orderId,deliveryDate,vehicleNo,driverId,deliveryStatus}=req.body;
    const updateDelivery={
        orderId,
        deliveryDate,
        vehicleNo,
        driverId,
        deliveryStatus
    }
    const update=await Delivery.findByIdAndUpdate(deliveryId,updateDelivery)
    .then(()=>{
        res.status(200).send({status: "Delivery details updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error:err.message})
    })    
})

router.route("/delete/:id").delete(async(req,res)=>{
    let deliveryId=req.params.id;

    await Delivery.findByIdAndDelete(deliveryId).then(()=>{
        res.status(200).send({status: "Delivery deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Cannot update the delivery"})
    })

})

router.route("/get/:id").get(async (req, res) => {
    let deliveryId = req.params.id;
    try {
        const delivery = await Delivery.findById(deliveryId);
        if (!delivery) {
            return res.status(404).send({ status: "Delivery not found" });
        }
        res.status(200).send({ status: "Delivery fetched", delivery: delivery });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error fetching the delivery" });
    }
});

export default router;