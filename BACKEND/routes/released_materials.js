const router = require("express").Router();

const released_material=require("../models/released_material")
let Released_material = require("../models/released_material");



router.route("/add").post((req,res)=>{
    //catch the details from in request body that come from frontend
    const material_name = req.body.material_name;
    const released_quantity = Number(req.body.released_quantity);
    const employee_id = req.body.employee_id;
    const employee_name = req.body.employee_name;
    const description = req.body.description;

    const newReleasedMaterial = new released_material({
        material_name,
        released_quantity,
        employee_id,
        employee_name,
        description
    })

    //save in database and gave console msg or log errors(exception handilng)
    newReleasedMaterial.save().then(()=>{
        res.json("data Added...!!")
    }).catch((err)=>{
        console.log(err);
    })


})


// material view
router.route("/").get((req,res)=>{
    released_material.find().then((released_materials)=>{
        res.json(released_materials)
    }).catch((err)=>{
        console.log(err)
    })
})

//update the material
router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const {material_name,released_quantity,employee_id,employee_name,description
    }=req.body;
    
    const updateReleasedMaterial = {
        material_name,
        released_quantity,
        employee_id,
        employee_name,
        description
    }
    const update = await released_material.findByIdAndUpdate(userId,updateReleasedMaterial).then((material)=>{
        res.status(200).send({status:"data updated",released_material})
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status:"error with updating data",error:err.message});
    })
})

//delete operation for materials
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await released_material.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"row deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete",error:err.message});
    })
}) 

// get one material
router.route("/get/:id").get(async(req,res)=>{
    let userId=req.params.id;
    //product.findOne(email)
   const user =  await released_material.findById(userId).then((released_material)=>{
        res.status(200).send({status:"data fetched",released_material})
    }).catch(()=>{
        res.status(500).send({status:"error with get data",error:err.message});
    })
})



module.exports = router;