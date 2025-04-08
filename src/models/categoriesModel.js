import client from "../pg/pg.js";


class apiError extends Error {
    constructor(status, message) {
        super(message);
        this.statusCode = status;
        this.name = this.constructor.name;
    }
}


export const categoriesModel = {
    async create(categoryName) {
        const query = "INSERT INTO categories(name) VALUES($1) RETURNING * "

        try {
            const result = await client.query(query, [categoryName]);
            // console.log("result", result);
            // return result.rows[0];
            return {
                "categoryId": result.rows[0].id,
                "message": "Category created"
            };


        } catch (error) {
            if (error.code === '23505') {  // 23505 -> Uniquelikni buzish xatoligi kodi (Unique violation error code)
                throw new apiError(400, 'Category already exists!');
            }
            throw new apiError(500, error);
        }

    },

    async getAllCategories() {
        const query = "SELECT * FROM categories";
        const result = await client.query(query);
        return result.rows;
    },
    async getCategory(id) {
        const query = "SELECT * FROM categories WHERE id = $1";
        const values = [id];
        try {
            const result = await client.query(query, values);

            if (result.rowCount == 0) {
                throw new apiError(404, 'Category not found!');

            }
            return result.rows;
        } catch (error) {
            if (error.statusCode) {
                throw new apiError(error.statusCode, error.message);
            }
            throw new apiError(500, error.message);
        }
    },

    // ishlamayabdi
    async update(id, name) {
        console.log("id, name ->", id, name);



        try {
            const query = "UPDATE categories SET name = $1 WHERE id = $2  RETURNING *";
            const update = await client.query(query, [name, id]);
            if (!name || !id) {
                return res.status(400).json({ error: 'Name and id are required' });
            }
            return update.rows[0];


        } catch (error) {
            if (error.code === '23505') {  // 23505 -> Email yoki usernamedan 2-marta ro'yxatdan o'tishda shu xato kodi keladi  (Unique violation error code)
                throw new apiError(400, 'Category does not exists!');
            }
            throw new apiError(500, error);
        }


    },

    async delete(id) {
        try {
            const query = "DELETE FROM categories WHERE id = $1 RETURNING * ";
            const res = await client.query(query, [id]);
            return { message: "Category deleted" };
        } catch (error) {
            throw new apiError(500, error.message);
        }
    }

}