import connection from "../database.js";

async function findByEmail(email){
    const user = await connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
    );
    return user.rows[0];
}

async function createUser(name, email, hashedPassword){
    await connection.query(
        `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
        [name, email, hashedPassword]
    );
}

export { findByEmail, createUser };