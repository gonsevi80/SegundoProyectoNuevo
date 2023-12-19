// Registro: POST /user/registry
// Login: POST /user/login

// Lista categories: GET /categories
// Crear: POST /news (TOKEN)
// Editar: PUT /news/:idNews (req.params) (TOKEN)
// Eliminar: DELETE /news/:idNews (req.params) (TOKEN)

// Listado news: GET /news (n. votos positivos y negativos), vote pos? vot neg? y filtos/order con req.query .
// Ejemplos:
// GET /news - devuelve todas las news ordenadas por fecha DESC
// GET /news?theme=1 - devuelve todas las news, de la categoría 1, ordenadas por fecha DESC
// GET /news?today=true - devuelve todas las news de hoy
// GET /news?today=true&order="like"&direction="desc" - devuelve todas las news de hoy ordenadas por like DESC
// GET /news?today=false - devuelve todas las noticias que no sean actuales
// GET /news?theme=1&today=true

// Detalle news GET /news/:idNews (TOKEN)

// Votar: POST /news/:idNews/vote/ (TOKEN) - en body:
// {"vote":"1/0"}
// Si voto no existe hago insert, si existe elimino con delete
// (devolver el numero actual de like)
=======

# El Notición

Se trata de una web donde los usuarios publican noticias. Cada noticia tiene un título o headline, entradilla (entrance),texto (paragraphs), categoría y 1 foto asignada. Cada noticia puede ser votada tanto positiva como negativamente y comentada por los usuarios registrados.

Cada noticia y comentario vendrán con su fecha y hora de publicación.

Los usuraios registrados podran gestionar su propio perfil y además añadir su propia foto o avatar.

## Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.

2. Guardar el archivo `.env.example` como `.env` para no subir los datos por seguridad..

3. Ejecutar `npm run initDb` para crear las tablas necesarias en la base de datos.

4. Ejecutar `npm run dev` para lanzar el servidor.

## Base de datos

### users

| Campo            | Tipo         | Descripción                            |
| ---------------- | ------------ | -------------------------------------- |
| id               | VARCHAR(36)  | Identificador único del usuario        |
| email            | VARCHAR(100) | Correo electrónico del usuario         |
| password         | VARCHAR(100) | Contraseña del usuario (hash)          |
| username         | VARCHAR(30)  | Nombre de usuario del usuario          |
| avatar           | VARCHAR(100) | URL del avatar del usuario             |
| role             | ENUM         | Rol del usuario ("admin" o "normal")   |
| active           | BOOLEAN      | Indica si el usuario está activo o no  |
| registrationCode | VARCHAR(36)  | Código de registro del usuario         |
| recoverPassCode  | VARCHAR(36)  | Código de recuperación de contraseña   |
| createdAt        | DATETIME     | Fecha y hora de creación del usuario   |
| modifiedAt       | DATETIME     | Fecha y hora de la última modificación |

### news

| Campo      | Tipo         | Descripción                            |
| ---------- | ------------ | -------------------------------------- |
| id         | VARCHAR(36)  | Identificador único de la noticia      |
| headline   | VARCHAR(100) | Título de la noticia                   |
| categories | VARCHAR(25)  | Temática de la noticia                 |
| entrance   | VARCHAR(200) | descripción escueta de la noticia      |
| paragraphs | TEXT         | Descripción de los Hechos              |
| idUser     | VARCHAR(36)  | Identificador del usuario creador      |
| createdAt  | DATETIME     | Fecha y hora de creación de la noticia |

### newsPhotos

| Campo     | Tipo         | Descripción                                            |
| --------- | ------------ | ------------------------------------------------------ |
| id        | VARCHAR(36)  | Identificador único de la foto                         |
| name      | VARCHAR(100) | Nombre de la foto                                      |
| idnews    | VARCHAR(36)  | Identificador de la noticia a la que pertenece la foto |
| createdAt | DATETIME     | Fecha y hora de creación de la foto                    |

### newsVotes

| Campo     | Tipo        | Descripción                        |
| --------- | ----------- | ---------------------------------- |
| id        | VARCHAR(36) | Identificador único del voto       |
| value     | TINYINT     | Valor del voto (del 1 al 5)        |
| idnews    | VARCHAR(36) | Identificador de la noticia votada |
| idUser    | VARCHAR(36) | Identificador del usuario que votó |
| createdAt | DATETIME    | Fecha y hora de creación del voto  |

## Endpoints del usuario

- **POST** - `/users/register` - Crea un nuevo usuario pendiente de activar.
- **PUT** - `/users/validate/:registrationCode` - Valida a un usuario recién registrado.
- **POST** - `/users/login` - Logea a un usuario retornando un token.
- **GET** - `/users/:userId` - Retorna información pública de un usuario (ver el perfil).
- **GET** - `/users` - Retorna información privada del usuario con el id del token.
- **PUT** - `/users/avatar` - Permite actualizar el avatar del usuario.
- **POST** - `/users/password/recover` - Envía al usuario un correo de recuperación de contraseña.
- **PUT** - `/users/password/reset` - Actualiza la contraseña de un usuario mediante un código de recuperación.

## Endpoints de El Notición

- **POST** - `/news` - Crea una noticia.
- **GET** - `/news` - Devuelve el listado de noticias.
- **GET** - `/news/:newsId` - Devuelve una noticia en concreto.
- **POST** - `/news/:newsId/photos` - Agregar una foto a una noticia.
- **DELETE** - `/news/:newsId/photos/:photoId` - Eliminar una foto de una noticia.
- **POST** - `/news/:newsId/votes` - Vota una noticia (1 o 0, like, dislike).
- **DELETE** - `/news/:newsId` - Eliminar una noticia
