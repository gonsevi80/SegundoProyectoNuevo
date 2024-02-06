import jwt from "jsonwebtoken";
import {
  invalidCredentialsError,
  notAuthenticatedError,
} from "../services/errorService.js";

const authUserController = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      notAuthenticatedError();
    }

    const tokenParts = authorization.split(" ");
    let token;
    if (tokenParts.length > 1) {
      token = tokenParts[1];
    } else {
      token = tokenParts[0];
    }

    let tokenInfo;

    try {
      tokenInfo = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      invalidCredentialsError();
    }

    req.user = tokenInfo;
    console.log(req.user);
    next();
  } catch (error) {
    next(error);
  }
};

export default authUserController;
