import client from "../pg/pg.js";


class apiError extends Error {
    constructor(status, message) {
        super(message);
        this.statusCode = status;
        this.name = this.constructor.name;
    }
}


export const userModel = {
    async create(user) {   // User -> { email, username, password, role}
        const query = "INSERT INTO users (email, username, password, role, status) VALUES ($1, $2, $3, $4, $5) RETURNING *"
        const values = [user.email, user.username, user.password, user.role, "inactive"];

        try {
            const result = await client.query(query, values);
            // console.log("result", result);
            return result.rows;

        } catch (error) {
            if (error.code === '23505') {  // 23505 -> Email yoki usernamedan 2-marta ro'yxatdan o'tishda shu xato kodi keladi  (Unique violation error code)
                throw new apiError(400, 'User already exists');
            }
            throw new apiError(500, error);
        }

    },

    async getAllUsers() {
        const query = "SELECT * FROM users";
        const result = await client.query(query);
        return result.rows;
    },
    async getOne(id) {
        const query = "SELECT * FROM users WHERE id = $1";
        const values = [id];
        try {
            const result = await client.query(query, values);

            if (result.rowCount == 0) {
                throw new apiError(404, 'User not found');

            }
            return result.rows;
        } catch (error) {
            if (error.statusCode) {
                throw new apiError(error.statusCode, error.message);
            }
            throw new apiError(500, error.message);
        }
    },

    async update(user) {   // User -> { email, username, password, role}
        // console.log("user -> ", user)

        try {
            if (user.email && user.password) {

                const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
                const values = [user.email, user.password];
                const result = await client.query(query, values);
                // console.log("result -> ", result)
                if (result.rowCount == 0) {
                    throw new apiError(404, 'User not found');
                }


                const currentUserData = result.rows[0];
                const newUserData = {
                    username: user.username || currentUserData.username,
                    password: user.password == currentUserData.password ? (user.newPassword || currentUserData.password) : currentUserData.password,
                    role: user.role || currentUserData.role,
                    status: user.status || currentUserData.status,
                }

                const updateQuery = "UPDATE users SET username = $1, password = $2, role = $3, status = $4  WHERE email = $5 AND password = $6 RETURNING *";

                const updateValues = [newUserData.username, newUserData.password, newUserData.role, newUserData.status, user.email, user.password];
                const updateResult = await client.query(updateQuery, updateValues);
                return updateResult.rows[0];


            } else if (user.username && user.password) {

            }

        } catch (error) {
            // console.log(error)
            if (error.code == "22P02") {
                throw new apiError(500, "Enum uchun Noto'g'ri malumot kiritildi!!!");
            }
            throw new apiError(500, error.message);
        }

    },

    async delete(user) {

    }

}