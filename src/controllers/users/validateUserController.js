import updateUserRegCodeModel from "../../models/users/updateUserRegCodeModel.js";
const validateUserController = async (req, res, next) => {
  try {
    const { registrationCode } = req.params;

    await updateUserRegCodeModel(registrationCode);

    return res.status(200).json({
      status: "ok",
      message: "Usuario activado con éxito.",
    });
  } catch (err) {
    console.error("Error al activar el usuario:", err.message);
    return res.status(404).json({
      httpStatus: 404,
      code: "RESOURCE_NOT_FOUND",
      message: err.message || "El recurso requerido 'usuario' no existe",
    });
  }
};

export default validateUserController;
