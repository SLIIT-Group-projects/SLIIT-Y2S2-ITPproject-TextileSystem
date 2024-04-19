const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const lorrySchema = new Schema({
    lorryNumber: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    driverName:{
        type:String,
        required:true
    }
}, {
    timestamps: true
});

const Lorry = mongoose.model('Lorry', lorrySchema);

module.exports = Lorry;
