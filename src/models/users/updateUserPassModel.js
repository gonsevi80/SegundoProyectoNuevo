// Importamos las dependencias.
import bcrypt from "bcrypt";

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Importamos los modelos.
import selectUserByEmailModel from "./selectUserByEmailModel.js";

// Importamos los servicios.
import { recoveryCodeError } from "../../services/errorService.js";

// Función que realiza una consulta a la base de datos para actualizar la contraseña de un usuario.
const updateUserPassModel = async (email, recoverPassCode, newPass) => {
  const pool = await getPool();

  // Obtenemos al usuario en base al email recibido.
  const user = await selectUserByEmailModel(email);

  // Si no encontramos ningún usuario o si el código es incorrecto lanzamos un error.
  if (!user || user.recoverPassCode !== recoverPassCode) {
    recoveryCodeError();
  }

  // Encriptamos la nueva contraseña.
  const hashedPass = await bcrypt.hash(newPass, 10);

  // Actualizamos el usuario.
  await pool.query(
    `UPDATE users SET password = ?, recoverPassCode = null WHERE recoverPassCode = ?`,
    [hashedPass, recoverPassCode]
  );
};

export default updateUserPassModel;
