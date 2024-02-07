// Importamos las dependencias.
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { FRONTEND_URL } from "../../../env.js";

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Importamos las utilidades de mail.
import sendMailUtil from "../../utils/sendMailUtil.js";

// Importamos los errores.
import {
  emailAlreadyRegisteredError,
  userAlreadyRegisteredError,
} from "../../services/errorService.js";

// Función que realiza una consulta a la base de datos para crear un nuevo usuario.
const insertUserModel = async (
  username,
  email,
  biography,
  hobbies,
  password,
  registrationCode
) => {
  const pool = await getPool();

  // Buscamos en la base de datos algún usuario con ese nombre.
  let [users] = await pool.query(`SELECT id FROM users WHERE username = ?`, [
    username,
  ]);

  // Si existe algún usuario con ese nombre lanzamos un error.
  if (users.length > 0) {
    userAlreadyRegisteredError();
  }

  // Buscamos en la base de datos algún usuario con ese email.
  [users] = await pool.query(`SELECT id FROM users WHERE email = ?`, [email]);

  // Si existe algún usuario con ese email lanzamos un error.
  if (users.length > 0) {
    emailAlreadyRegisteredError();
  }

  //? enviar correo
  // Creamos el asunto del email de verificación.
  const emailSubject = "Activa tu usuario en El Notición ;P";

  // Creamos el contenido del email (body)
  const emailBody = `
  ¡Bienvenid@ ${username}!

  Estamos encantados de que te hayas registrado en El Notición! Ahora, para activar tu cuenta, haz click en el siguiente enlace:
  <a href="${FRONTEND_URL}/users/validate/${registrationCode}">Activar mi cuenta</a>
`;

  // Enviamos el email de verificación al usuario.
  // await sendMailUtil(email, emailSubject, emailBody);

  // Encriptamos la contraseña.
  const hashedPass = await bcrypt.hash(password, 10);

  // Insertamos el usuario.
  await pool.query(
    `INSERT INTO users(id, username, email, biography, hobbies, password, registrationCode) VALUES(?, ?, ?, ?, ?, ?, ?)`,
    [uuid(), username, email, biography, hobbies, hashedPass, registrationCode]
  );
};

export default insertUserModel;
