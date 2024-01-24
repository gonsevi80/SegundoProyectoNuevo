import dotenv from "dotenv";

dotenv.config();

//console.log("ENVIRONMENT VARIABLES:", process.env);

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_DB,
  PORT,
  SECRET,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  UPLOADS_DIR,
  FRONTEND_URL,
} = process.env;

//console.log("UPLOADS_DIR:", UPLOADS_DIR);

export {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_DB,
  PORT,
  SECRET,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  UPLOADS_DIR,
  FRONTEND_URL,
};
