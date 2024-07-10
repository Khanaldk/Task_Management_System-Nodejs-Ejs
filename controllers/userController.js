const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {};

userController.HomePage = async (req, res) => {
  return res.render("home");
};

userController.SignUpPage = async (req, res) => {
  return res.render("signup", { message: req.flash() });
};

userController.LogInPage = async (req, res) => {
  return res.render("login", { message: req.flash() });
};

userController.SignUp = async (req, res) => {
  const { userName, email, password, confirmpassword } = req.body;
  const checkEmail = await models.User.findOne({ where: { email: email } });
  if (checkEmail) {
    req.flash("EmailError", "Email already in use!");
    return res.redirect("/signup");

    // return res.status(409).json({
    //   message: "Email already in use",
    // });
  }

  if (password != confirmpassword) {
    // // return res.status(402).json({
    // //   message: "Password and Confirmpassword doesnot match!",
    // });
    req.flash("PasswordError", "Password and confirmpassword don't match!");
    return res.redirect("/signup");
  }

  const hashpassword = await bcrypt.hash(password, 12);
  const hashpassword2 = await bcrypt.hash(confirmpassword, 12);

  const Userdata = {
    userName: userName,
    email: email,
    password: hashpassword,
    confirmpassword: hashpassword2,
  };

  const createUser = await models.User.create(Userdata);
  if (createUser) {
    // return res.status(200).json(Userdata);
    return res.redirect("/login");
  } else {
    return res.send("something went wrong!");
  }
};

userController.Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash(
      "EmailPasswordError",
      "Please first enter the email or password!"
    );
    return res.redirect("/login");

    // return res.status(400).json({
    //   message: "Please first enter the email or password!",
    // });
  }
  const userData = await models.User.findOne({ where: { email: email } });
  if (!userData) {
    req.flash("EmailError", "invalid email!");
    return res.redirect("/login");

    // return res.status(404).json({
    //   message: "Email isnot registered ,Please first registered the email!",
    // });
  }
  const checkpassword = await bcrypt.compare(password, userData.password);
  if (!checkpassword) {
    req.flash("InvalidPassword", "Password is incorrect!");
    // return res.status(402).json({
    //   message: "Invalid credentials",
    // });
    return res.redirect("/login");
  }
  const token = await jwt.sign(
    { id: userData.id, email: userData.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );
  if (token) {
    // return res.status(200).json({
    //   message: "Login success!",
    //   token: token,
    // });

    return res.redirect("/showcategorytaskpage");
  }
};

module.exports = userController;
