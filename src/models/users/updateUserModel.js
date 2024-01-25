import getPool from "../../db/getPool.js";

const updateUserModel = async (email, username, userId) => {
  const pool = await getPool();

  await pool.query(
    `
        UPDATE users
        SET email = ?, username = ?
        WHERE id = ?
        `,
    [email, username, userId]
  );
};

export default updateUserModel;
