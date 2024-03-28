const router= require("express").Router();
const Order = require("../models/order");

router.route("/add").post((req,res)=>{
    const deliveryDate= Date(req.body.deliveryDate);
    const vehicleNo= req.body.vehicleNo;
    const driverId= req.body.driverId;

    const newDelivery= new Delivery({
        deliveryDate,
        vehicleNo,
        driverId
    })

    newDelivery.save().then(()=>{
        res.json("Delivery added")
    }).catch((err)=>{
        console.log(err);
    })
})
router.route("/").get((req,res)=>{
    Order.find().then((order)=>{
        res.json(order)
    }).catch((err)=>{
        console.log(err)
    })

})


router.route("/get/:id").get(async (req, res) => {
    let orderId = req.params.id;
    try {
        const order = await Order.findById(orderId);
        res.status(200).send({ status: "order is fetched", order: order });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error fetching the delivery" });
    }
});

module.exports=router;