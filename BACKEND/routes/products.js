const router = require("express").Router();
const product = require("../models/product");
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


// prducts view
router.route("/").get((req,res)=>{
    product.find().then((products)=>{
        res.json(products)
    }).catch((err)=>{
        console.log(err)
    })
})

//update the product
router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const {product_name,product_description,quantity,unit_price,size
    }=req.body;
    
    const updateProduct = {
        product_name,
        product_description,
        quantity,
        unit_price,
        size
    }
    const update = await product.findByIdAndUpdate(userId,updateProduct).then((product)=>{
        res.status(200).send({status:"user updated",product})
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status:"error with updating data",error:err.message});
    })
})

//delete operation for products
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await product.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"product deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete product",error:err.message});
    })
}) 

// get one product
router.route("/get/:id").get(async(req,res)=>{
    let userId=req.params.id;
    //product.findOne(email)
   const user =  await product.findById(userId).then((product)=>{
        res.status(200).send({status:"product fetched",product})
    }).catch(()=>{
        res.status(500).send({status:"error with get product",error:err.message});
    })
})



module.exports = router;