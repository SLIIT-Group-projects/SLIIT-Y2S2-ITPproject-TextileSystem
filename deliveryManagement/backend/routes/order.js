const router= require("express").Router();
const Order = require("../models/order");


router.route("/").get((req,res)=>{
    Order.find().then((order)=>{
        res.json(order)
    }).catch((err)=>{
        console.log(err)
    })

})
router.route("/add").post((req,res)=>{
    const customerCode= req.body.customerCode;
    const orderId= req.body.orderId;
    const deliveryAddress= req.body.deliveryAddress;
    const quantity= req.body.quantity;
    
    const newOrder= new Order({
        customerCode,
        orderId,
        deliveryAddress,
        quantity
    })

    newOrder.save().then(()=>{
        res.json("Order added")
    }).catch((err)=>{
        console.log(err);
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