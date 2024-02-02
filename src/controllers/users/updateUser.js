import updateUserModel from "../../models/users/updateUserModel.js";

const updateUser = async (req, res, next) => {
  try {
    const { email, username, biography, hobbies } = req.body;

    await updateUserModel(email, username, biography, hobbies, req.user.id);

    res.send({
      status: "ok",
      message: "Usuario actualizado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export default updateUser;
