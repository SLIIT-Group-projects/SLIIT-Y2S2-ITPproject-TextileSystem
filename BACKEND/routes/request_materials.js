const express = require("express");
const request_material = require("../models/request_material");

const router = express.Router();

// Route for adding a new request material
router.post("/add", async (req, res) => {
    try {
        const { material_ID, material_name, roll_quantity, color, date } = req.body;
        const newRequestMaterial = new request_material({
            material_ID,
            material_name,
            roll_quantity,
            color,
            date,
        });
        await newRequestMaterial.save();
        res.status(201).json({ message: "Request Material Added!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while adding request material." });
    }
});

// material view
router.route("/").get((req,res)=>{
    request_material.find().then((request_materials)=>{
        res.json(request_materials)
    }).catch((err)=>{
        console.log(err)
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
