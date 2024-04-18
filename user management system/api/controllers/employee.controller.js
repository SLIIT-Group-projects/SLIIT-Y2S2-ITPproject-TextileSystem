import Employee from "../models/employee.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async(req, res, next) => {

    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not allowed to create an employee!"));
    }

    if (!req.body.secreteKey || !req.body.registerNumber || !req.body.username || !req.body.email || !req.body.phoneNumber) {
        return next(errorHandler(400, "All fields are required!"));
    }

    const newEmployee = new Employee({

        secreteKey: req.body.secreteKey,
        category: req.body.category,
        registerNumber: req.body.registerNumber,
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        image: req.body.image

    });

    try {
        const savedEmployee = await newEmployee.save();
        res.this.status(200).json(savedEmployee);

    } catch (error) {

    }
}