import express from "express";
import Material from "../models/material.js";
import material from "../models/material.js";

const router = express.Router();

router.route("/add").post((req,res)=>{
    //catch the details from in request body that come from frontend
    const material_ID = req.body.material_ID;
    const material_name = req.body.material_name;
    const material_type = req.body.material_type;
    const roll_quantity = Number(req.body.roll_quantity);
    const color = req.body.color;

    const newMaterial = new material({
        material_ID,
        material_name,
        material_type,
        roll_quantity,
        color
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
    const {material_ID,material_name,material_type,roll_quantity,color
    }=req.body;
    
    const updateMaterials = {
        material_ID,
        material_name,
        material_type,
        roll_quantity,
        color
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

// Reduce roll_quantity and add released materials when conditions are met
router.route("/reduce-and-add").put(async (req, res) => {
    try {
      const { item_name, color, target } = req.body;
  
      // Find the material that matches the item_name and color
      const material = await Material.findOne({ material_name: item_name, color });
  
      if (!material) {
        return res.status(404).json({ error: "Material not found" });
      }
  
      // Reduce roll_quantity by the target amount
      material.roll_quantity -= target;
  
      // Save the updated material
      await material.save();
  
      // Add released material
      const releasedMaterial = new ReleasedMaterial({
        item_name,
        color,
        target,
        // Add other relevant fields
      });
  
      await releasedMaterial.save();
  
      res.status(200).json({ status: "Roll quantity reduced and released material added successfully", material });
    } catch (error) {
      console.error("Error reducing roll quantity and adding released material:", error);
      res.status(500).json({ error: "Error reducing roll quantity and adding released material" });
    }
  });
  

export default router;