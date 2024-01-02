// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../db/getPool.js";

// Importamos los servicios.
import sendMailUtil from "../utils/sendMailUtil.js";

// Función que realiza una consulta a la base de datos para actualizar el avatar de un usuario.
const updateRecoverPassModel = async (email, recoverPassCode) => {
  const pool = await getPool();

  // Actualizamos el código de recuperación de contraseña del usuario.
  await pool.query(`UPDATE users SET recoverPassCode = ? WHERE email = ?`, [
    recoverPassCode,
    email,
  ]);

  // Creamos el asunto del email de recuperación de contraseña.
  const emailSubject = "Buenas! Recupera tu contraseña en el Notición ;P";

  // Creamos el contenido del email
  const emailBody = `
            Se ha solicitado la recuperación de contraseña para este email en El Notición. 
                
            Usa el siguiente código para crear una nueva contraseña y... ¡que la fuerza te acompañe!: ${recoverPassCode}

            Si no has sido tú... olvida este email...
        `;

  // Enviamos el email de verificación al usuario.
  await sendMailUtil(email, emailSubject, emailBody);
};

export default updateRecoverPassModel;
