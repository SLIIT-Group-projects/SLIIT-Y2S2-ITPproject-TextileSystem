import CreateUser from '../models/createUser.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async(req, res, next) => {

    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not allowed to create users!"));
    }
    if (!req.body.username || !req.body.email || !req.body.secreteKey) {
        return next(errorHandler(400, "All fields are required!"));
    }
    // Example: Create a new user object
    const newUser = new CreateUser({
        secreteKey: req.body.secreteKey,
        category: req.body.category,
        registerNumber: req.body.registerNumber,
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        next(error);
    }
};