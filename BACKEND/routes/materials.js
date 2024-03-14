const router = require("express").Router();

const material=require("../models/material")
let Material = require("../models/material");



router.route("/add").post((req,res)=>{
    //catch the details from in request body that come from frontend
    const material_name = req.body.material_name;
    const material_type = req.body.material_type;
    const roll_quantity = Number(req.body.roll_quantity);
    const color = req.body.color;
    const supplier_id = req.body.supplier_id;

    const newMaterial = new material({
        material_name,
        material_type,
        roll_quantity,
        color,
        supplier_id
    })

    //save in database and gave console msg or log errors(exception handilng)
    newMaterial.save().then(()=>{
        res.json("Material Added...!!")
    }).catch((err)=>{
        console.log(err);
    })


})


// material view
router.route("/").get((req,res)=>{
    material.find().then((materials)=>{
        res.json(materials)
    }).catch((err)=>{
        console.log(err)
    })
})

//update the material
router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const {material_name,material_type,roll_quantity,color,supplier_id
    }=req.body;
    
    const updateMaterials = {
        material_name,
        material_type,
        roll_quantity,
        color,
        supplier_id
    }
    const update = await material.findByIdAndUpdate(userId,updateMaterials).then((material)=>{
        res.status(200).send({status:"user updated",material})
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status:"error with updating data",error:err.message});
    })
})

//delete operation for materials
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await material.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"material deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete material",error:err.message});
    })
}) 

// get one material
router.route("/get/:id").get(async(req,res)=>{
    let userId=req.params.id;
    //product.findOne(email)
   const user =  await material.findById(userId).then((material)=>{
        res.status(200).send({status:"material fetched",material})
    }).catch(()=>{
        res.status(500).send({status:"error with get material",error:err.message});
    })
})



module.exports = router;