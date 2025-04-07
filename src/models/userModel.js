import client from "../pg/pg.js";


class apiError extends Error {
    constructor(status, message) {
        super(message);  // Call the parent class (Error) constructor with the message
        this.statusCode = status;  // Add a custom status property
        this.name = this.constructor.name;  // Set the name of the error
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
        console.log("user -> ", user)

        try {

            // if (user.email && user.password) {

            //     let val = []
            //     // const keysOfData = Object.keys(user).reduce((acc, key, index, arr) => {

            //     //     if (key === "email" || key === "password") {
            //     //         values.push(user[key]);
            //     //     }

            //     //     return acc + key + (index < arr.length - 1 ? ',' : '');

            //     // }, '');
            //     // const keysOfData = Object.keys(user).reduce((acc, key, index, arr) => {
            //     //     if (key !== "email" || key !== "password") {
            //     //         console.log("key -> ", key)
            //     //         val.push(user[key]);
            //     //         return acc + key + (index < arr.length - 1 ? ',' : '');
            //     //     }
            //     //     return acc;
            //     // }, '');
            //     const keysOfData = Object.keys(user).reduce((acc, key, index, arr) => {
            //         if (key !== "email" && key !== "password") {
            //             val.push(user[key]);
            //             return acc + (acc ? ',' : '') + key;
            //         }
            //         return acc;
            //     }, '');

            //     console.log("Vals -> ", val);
            //     console.log("Keys ->", keysOfData);
            //     keysOfData.unshift(val)

            //     const query = "INSERT INTO users ($1) VALUES ( $2, $3) RETURNING *"
            //     // const values = [keysOfData, user.email, user.username, user.password, user.role, "inactive"];

            //     const result = await client.query(query, keysOfData);
            //     // console.log("result", result);
            //     return result.rows;
            //     return { vals: val, keys: keysOfData };
            // } 
            // 
            if (user.email && user.password) {
                let val = [];

                const keysOfData = Object.keys(user).reduce((acc, key) => {
                    if (key !== "email" && key !== "password") {
                        val.push(user[key]);
                        acc.push(key);
                    }
                    return acc;
                }, []);

                console.log("Vals -> ", val);
                console.log("Keys ->", keysOfData);

                const query = `INSERT INTO users (${keysOfData.join(', ')}) VALUES (${keysOfData.map((_, index) => `$${index + 1}`).join(', ')}) RETURNING *`;

                const result = await client.query(query, [...val, user.email, user.username, user.password, user.role, "inactive"]);

                console.log("Inserted row ->", result.rows);

                return result.rows;
            }
            else if (user.username && user.password) {

            }

            // const query = "INSERT INTO users (email, username, password, role, status) VALUES ($1, $2, $3, $4, $5) RETURNING *"
            // const values = [user.email, user.username, user.password, user.role, "inactive"];
            // const result = await client.query(query, values);
            // // console.log("result", result);
            // return result.rows;
        } catch (error) {

        }



    },

}