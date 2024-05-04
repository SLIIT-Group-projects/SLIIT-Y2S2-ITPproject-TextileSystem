import express from "express";
import request_material from "../models/request_material.js";
import nodemailer from "nodemailer";

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
        const emailHTML = `
            <h1>Material Order Request</h1>
            <h2>please request the follwing material from the relevant supplier</h2> <br/>
            <p>Material ID: ${material_ID}</p>
            <p>Material Name: ${material_name}</p>
            <p>Material Quantity: ${roll_quantity}</p>
            <p>Material colour: ${color}</p> <br/>
            <p><i>Internal use only</i></p> <br/>

        `;

        // Create transporter
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: "ptiproject2024@gmail.com",
                pass: "gdgj szjg nkth pmxe"
            }
        });

        const mailOptions = {
            from: 'ptiproject2024@gmail.com',
            to: 'kaushikadaham2002@gmail.com',
            subject: "Request for Order Material", 
            html: emailHTML
          };  

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              res.status(500).json({ message: 'Error sending email' });
            } else {
              console.log('Email sent: ' + info.response);
           }
          });


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

export default router;
