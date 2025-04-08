import client from "../pg/pg.js";
// tayyor emas


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
            // return result.rows[0];
            return {
                "message": "User created",
                "userId": result.rows[0].id,
                "otpSent": true
            };

        } catch (error) {
            if (error.code === '23505') {  // 23505 -> Email yoki usernamedan 2-marta ro'yxatdan o'tishda shu xato kodi keladi  (Unique violation error code)
                throw new apiError(400, 'User already exists');
            }
            throw new apiError(500, error);
        }

    },

    async getAllProducts() {
        try {
            const query = "SELECT * FROM products";
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            throw new apiError(500, error.message);
        }
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
                    email: user.email == currentUserData.email ? (user.newEmail || currentUserData.email) : currentUserData.email,
                    username: user.username || currentUserData.username,
                    password: user.password == currentUserData.password ? (user.newPassword || currentUserData.password) : currentUserData.password,
                    role: user.role || currentUserData.role,
                    status: user.status || currentUserData.status,
                }

                const updateQuery = "UPDATE users SET username = $1, password = $2, role = $3, status = $4, email = $5,updated_at = CURRENT_TIMESTAMP  WHERE email = $6 AND password = $7  RETURNING *";

                const updateValues = [newUserData.username, newUserData.password, newUserData.role, newUserData.status, newUserData.email, user.email, user.password];
                const updateResult = await client.query(updateQuery, updateValues);
                return updateResult.rows[0];


            } else if (user.username && user.password) {



                const query = "SELECT * FROM users WHERE username = $1 AND password = $2";
                const values = [user.username, user.password];
                const result = await client.query(query, values);
                // console.log("result -> ", result)
                if (result.rowCount == 0) {
                    throw new apiError(404, 'User not found');
                }


                const currentUserData = result.rows[0];
                const newUserData = {
                    username: user.username == currentUserData.username ? (user.newUsername || currentUserData.username) : currentUserData.username,
                    email: user.email || currentUserData.email,

                    // email: user.email == currentUserData.email ? (user.newEmail || currentUserData.email) : currentUserData.email,
                    // username: user.username || currentUserData.username,
                    password: user.password == currentUserData.password ? (user.newPassword || currentUserData.password) : currentUserData.password,
                    role: user.role || currentUserData.role,
                    status: user.status || currentUserData.status,
                }

                const updateQuery = "UPDATE users SET username = $1, password = $2, role = $3, status = $4, email = $5, updated_at = CURRENT_TIMESTAMP  WHERE username = $6 AND password = $7 RETURNING *";

                const updateValues = [newUserData.username, newUserData.password, newUserData.role, newUserData.status, newUserData.email, user.username, user.password];
                const updateResult = await client.query(updateQuery, updateValues);
                return updateResult.rows[0];

            }

        } catch (error) {
            // console.log(error)
            if (error.code == "22P02") {
                throw new apiError(500, "Enum uchun Noto'g'ri malumot kiritildi!!!");
            }
            throw new apiError(500, error.message);
        }

    },

    async delete(id) {
        try {
            const query = "DELETE FROM users WHERE id = $1 RETURNING * ";
            const res = await client.query(query, [id]);
            return { message: "User deleted", userId: res.rows[0].id };
        } catch (error) {
            throw new apiError(500, error.message);
        }
    }

}