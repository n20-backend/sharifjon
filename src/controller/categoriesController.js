import { categoriesModel } from "../models/categoriesModel.js";



export const categoriesController = {
    async getAllCategories(req, res) {
        try {
            const users = await categoriesModel.getAllCategories();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async getCategory(req, res) {
        try {
            // const userId = req.params.id;
            const users = await categoriesModel.getCategory(req.params.id);
            res.status(200).json(users);
        } catch (error) {
            res.status(error.statusCode).json({ error: error.message });
        }
    },

    async createCategory(req, res) {
        try {
            const user = await categoriesModel.create(req.body.name);  // User -> { email, username, password, role}
            res.status(201).json(user);
        } catch (error) {

            res.status(error.statusCode).json({ error: error.message });

        }
    },

    async update(req, res) {
        try {
            let name = req.body.name;
            console.log(`${req.params.id} -  ${name}`)
            const updatedUser = await categoriesModel.update(req.params.id, name);
            // console.log("updatedUser ->", updatedUser);
            // console.log(`Body: ${req.body} -> ${req.body.email} ${req.body.username} ${req.body.password}`);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(error.statusCode).json({ error: error.message });
        }
    },
    async delete(req, res) {
        try {
            // const userId = req.params.id;
            const deletedUser = await categoriesModel.delete(req.params.id);
            res.status(200).json(deletedUser);
        } catch (error) {
            res.status(error.statusCode).json({ error: error.message });
        }
    }

}

