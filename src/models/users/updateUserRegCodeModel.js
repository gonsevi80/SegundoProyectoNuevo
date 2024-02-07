import getPool from "../../db/getPool.js";

const updateUserRegCodeModel = async (registrationCode) => {
  const pool = await getPool();

  // Comprobamos si existe un usuario con ese código de registro.
  const [users] = await pool.query(
    `SELECT id FROM users WHERE registrationCode = ?`,
    [registrationCode]
  );

  // Si no existe ningún usuario con ese código de registro lanzamos un error.
  if (users.length < 1) {
    throw new Error(
      "Usuario no encontrado con código de registro: " + registrationCode
    );
  }

  // Actualizamos el usuario a activo y eliminamos el código de registro.
  const result = await pool.query(
    `UPDATE users SET active = true, registrationCode = NULL WHERE registrationCode = ? AND active = false`,
    [registrationCode]
  );

  if (result[0].affectedRows === 0) {
    throw new Error(
      "No se pudo activar el usuario o el usuario ya estaba activado."
    );
  }

  return true;
};

export default updateUserRegCodeModel;
