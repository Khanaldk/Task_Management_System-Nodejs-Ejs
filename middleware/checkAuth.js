const jwt = require("jsonwebtoken");

const CheckAuth = {};

CheckAuth.verificationToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(402).json({
        message: "token not found!",
      });
    }
    const splitToken = token.split(" ")[1];
    const accessToken = await jwt.verify(
      splitToken,
      process.env.JWT_SECRET_TOKEN
    );
    req.user = accessToken;
    return next();
  } catch (error) {
    return res.status(400).json({
      message: "Invalid token!",
    });
  }
};

module.exports = CheckAuth;
