// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para eliminar una foto de una noticia.
const deleteUserModel = async (userId) => {
  const pool = await getPool();

  // Eliminamos la foto.
  await pool.query(`DELETE FROM users WHERE id = ?`, [userId]);
};

export default deleteUserModel;
