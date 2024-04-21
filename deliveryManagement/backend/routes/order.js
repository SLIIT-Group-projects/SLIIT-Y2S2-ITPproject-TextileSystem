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
    const user= req.body.user;
    const orderItems= req.body.orderItems;
    const shippingAddress= req.body.shippingAddress;
    const shippingPrice= req.body.shippingPrice;
    const itemsPrice= req.body.itemsPrice;
    const paymentMethod= req.body.paymentMethod;
    const totalPrice= req.body.totalPrice;
    
    const newOrder= new Order({
        user,
        orderItems,
        shippingAddress,
        shippingPrice,
        itemsPrice, 
        paymentMethod,
        totalPrice,
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
        res.status(500).send({ status: "Error fetching the order" });
    }
});




module.exports=router;