const router = require("express").Router();
const Delivery = require("../models/delivery");
const Order = require("../models/order"); // Import the Order model
const nodeMailer= require('nodemailer');

// Add a delivery log
router.route("/add").post(async (req, res) => {
    const { deliveryDate, orderId, vehicleNo, driverId } = req.body;

    try {
        // Check if there's an existing delivery for the order
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
            <h1>New Delivery</h1>
            <p>Delivery details:</p>
            <p>Order ID: ${orderId}</p>
            <p>Delivery Date: ${deliveryDate}</p>
            <p>Vehicle Number: ${vehicleNo}</p>
            <p>Driver ID: ${driverId}</p>
        `;

       
        res.json({ message: "Delivery added and associated with order" });
    } catch (err) {
        console.error("Error adding delivery:", err);
        res.status(500).json({ status: "Error", message: "Failed to add delivery" });
    }
    
});

module.exports = router;


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



module.exports=router;