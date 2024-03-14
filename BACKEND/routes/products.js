const router = require("express").Router();
let Product = require("../models/product");


router.route("/add").post((req,res)=>{
    //catch the details from in request body that come from frontend
    const product_name = req.body.product_name;
    const product_description = req.body.product_description;
    const quantity = Number(req.body.quantity);
    const unit_price = Number(req.body.unit_price);
    const size = req.body.size;

    const newProduct = new Product({
        product_name,
        product_description,
        quantity,
        unit_price,
        size
    })

    //save in database and gave console msg or log errors(exception handilng)
    newProduct.save().then(()=>{
        res.json("Product Added...!!")
    }).catch((err)=>{
        console.log(err);
    })


})

module.exports = router;