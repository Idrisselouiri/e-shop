import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(404, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, userId) => {
    if (err) return next(errorHandler(404, "Forbidden"));

    req.user = userId;
    next();
  });
};
