import pg from "pg";
const { Pool } = pg;

const client = new Pool({
    user: process.env.PG_USER || "postgres",
    password: process.env.PG_PASSWORD || "70719505",
    host: process.env.PG_HOST || "localhost",
    port: process.env.PG_PORT || 5432,
    database: process.env.PG_DATABASE || "products",
});

client.connect((err, connection, release) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        throw new Error("Ulanmadi");
    } else {
        console.log("Connected to the database successfully.");
        release();
    }
});

export default client;
