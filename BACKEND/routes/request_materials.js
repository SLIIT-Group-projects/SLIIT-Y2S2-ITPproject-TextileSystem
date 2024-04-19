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


module.exports = router;
