import { userModel } from "../models/productModel.js";


export const userController = {
    async getAllUsers(req, res) {
        try {
            const users = await userModel.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async getOne(req, res) {
        try {
            const userId = req.params.id;
            const users = await userModel.getOne(userId);
            res.status(200).json(users);
        } catch (error) {
            res.status(error.statusCode).json({ error: error.message });
        }
    },

    async createUser(req, res) {
        try {
            const user = await userModel.create(req.body);  // User -> { email, username, password, role}
            res.status(201).json(user);
        } catch (error) {

            res.status(error.statusCode).json({ error: error.message });

        }
    },

    async updateUser(req, res) {
        try {
            const updatedUser = await userModel.update(req.body);
            console.log("updatedUser ->", updatedUser);
            console.log(`Body: ${req.body} -> ${req.body.email} ${req.body.username} ${req.body.password}`);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(error.statusCode).json({ error: error.message });
        }
    },
    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const deletedUser = await userModel.delete(userId);
            res.status(200).json(deletedUser);
        } catch (error) {
            res.status(error.statusCode).json({ error: error.message });
        }
    }

}
