import pg from "pg";
const { Pool } = pg;

const client = new Pool({
    user: process.env.PG_USER,          // || "user",
    password: process.env.PG_PASSWORD,   // || "pass",
    host: process.env.PG_HOST,           // || "host",
    port: process.env.PG_PORT,           // || port,
    database: process.env.PG_DATABASE    // || "dbName",
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
