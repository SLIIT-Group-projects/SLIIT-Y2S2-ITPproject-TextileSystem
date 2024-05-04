import express from 'express';
import Lorry from '../models/lorry.js';

const router = express.Router();

// Create a new lorry
router.route("/add").post((req,res)=>{
    const { lorryNumber, capacity, driverName} = req.body;
    
    const newLorry = new Lorry({
        lorryNumber,
        capacity,
        driverName,
    });

    newLorry.save().then(()=>{
        res.json("lorry added")
    }).catch((err)=>{
        console.log(err);
    })
})


// Get all lorries
router.get('/', async (req, res) => {
    try {
        const lorries = await Lorry.find();
        res.json(lorries);
    } catch (err) {
        console.error('Error fetching lorries:', err);
        res.status(500).json({ error: 'Failed to fetch lorries' });
    }
});

// Get a single lorry by ID
router.get('/:id', async (req, res) => {
    try {
        const lorry = await Lorry.findById(req.params.id);
        if (!lorry) {
            return res.status(404).json({ message: 'Lorry not found' });
        }
        res.json(lorry);
    } catch (err) {
        console.error('Error fetching lorry:', err);
        res.status(500).json({ error: 'Failed to fetch lorry' });
    }
});

// Update a lorry by ID
router.put('/update/:id', async (req, res) => {
    try {
        const { lorryNumber, capacity,driverName } = req.body;
        const updatedLorry = await Lorry.findByIdAndUpdate(req.params.id, {
            lorryNumber,
            capacity,
            driverName,
            // Add other fields to update here
        }, { new: true });
        if (!updatedLorry) {
            return res.status(404).json({ message: 'Lorry not found' });
        }
        res.json({ message: 'Lorry details updated successfully', lorry: updatedLorry });
    } catch (err) {
        console.error('Error updating lorry:', err);
        res.status(500).json({ error: 'Failed to update lorry details' });
    }
});

// Delete a lorry by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedLorry = await Lorry.findByIdAndDelete(req.params.id);
        if (!deletedLorry) {
            return res.status(404).json({ message: 'Lorry not found' });
        }
        res.json({ message: 'Lorry deleted successfully', lorry: deletedLorry });
    } catch (err) {
        console.error('Error deleting lorry:', err);
        res.status(500).json({ error: 'Failed to delete lorry' });
    }
});

export default router;
