import getPool from "../../db/getPool.js";

const updateUserModel = async (email, username, userId, biography, hobbies) => {
  const pool = await getPool();

  await pool.query(
    `
        UPDATE users
        SET email = ?, username = ?, biography = ?, hobbies = ?
        WHERE id = ?
        `,
    [email, username, biography, hobbies, userId]
  );
};

export default updateUserModel;
