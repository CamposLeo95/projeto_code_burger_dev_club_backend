import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";

export default (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    res.status(401).json({ error: "Token is not provided" });
  }

  const token = authToken.split(" ")[1];
  try {
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        throw new Error();
      }
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    res.status(401).json({ error: "Token is not valid" });
  }
};
