import getPool from "./getPool.js";

const main = async () => {
  // Variable que almacenará una conexión con la base de datos.
  let pool;

  try {
    pool = await getPool();

    console.log("Borrando tablas...");

    await pool.query("DROP TABLE IF EXISTS newsVotes, newsPhotos, news, users");

    console.log("Creando tablas...");

    // Creamos la tabla de usuarios.
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id CHAR(36) PRIMARY KEY NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                active BOOLEAN DEFAULT false,
                role ENUM('admin', 'normal') DEFAULT 'normal',
                registrationCode CHAR(30),
                recoverPassCode CHAR(10),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )	
        `);

    // Creamos la tabla de noticias.
    await pool.query(`
            CREATE TABLE IF NOT EXISTS news (
                id CHAR(36) PRIMARY KEY NOT NULL,
                headline VARCHAR(50) NOT NULL,
                entrance VARCHAR(300) NOT NULL,
                paragraphs TEXT NOT NULL,
                userId CHAR(36),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL
            )
        `);

    // Creamos la tabla de fotos.
    await pool.query(`
            CREATE TABLE IF NOT EXISTS newsPhotos (
                id CHAR(36) PRIMARY KEY NOT NULL,
                name VARCHAR(100) NOT NULL,
                newsId CHAR(36) NOT NULL,
                FOREIGN KEY (newsId) REFERENCES news(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

    // Tabla de votos.
    await pool.query(`
            CREATE TABLE IF NOT EXISTS newsVotes (
                id CHAR(36) PRIMARY KEY NOT NULL,
                value TINYINT UNSIGNED NOT NULL,
                userId CHAR(36) NOT NULL,
                newsId CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (newsId) REFERENCES news(id)
            )
        `);

    console.log("¡Tablas creadas!");
  } catch (err) {
    console.error(err);
  } finally {
    // Cerramos el proceso.
    process.exit();
  }
};

// Ejecutamos la función anterior.
main();
