const router= require("express").Router();
const Delivery = require("../models/delivery");


//add adeliverylog
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
    const {deliveryDate,vehicleNo,driverId}=req.body;
    const updateDelivery={
        deliveryDate,
        vehicleNo,
        driverId
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
        res.status(200).send({ status: "Delivery fetched", delivery: delivery });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error fetching the delivery" });
    }
});



module.exports=router;