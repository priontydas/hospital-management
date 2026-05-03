import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Invalid token",
        });
      }

      req.user = decode;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};