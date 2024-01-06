// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para eliminar un usuario.
const deleteUserModel = async (userId) => {
  const pool = await getPool();

  // Eliminamos el usuario.
  await pool.query(`DELETE FROM users WHERE id = ?`, [userId]);
};

export default deleteUserModel;
