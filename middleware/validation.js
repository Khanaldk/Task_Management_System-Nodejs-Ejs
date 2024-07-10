const { check, validationResult } = require("express-validator");
const models = require("../models");

const validation = {};

validation.UserValidate = [
  check("userName")
    .notEmpty()
    .withMessage("Username is required!")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 character!")
    .custom(async (value) => {
      const checkUserName = await models.User.findOne({
        where: { userName: value },
      });
      if (checkUserName) {
        throw Error("Username is already exist!");
      }
    }),
  check("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email is invalid!"),
  check("password")
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 character!"),
  check("confirmpassword")
    .notEmpty()
    .withMessage("confirmpassword is required!")
    .isLength({ min: 8 })
    .withMessage("confirmpassword must be at least 8 character!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(500).json({
      //   errors: errors.array(),
      // });
      req.flash("signupError", errors.array());
      return res.redirect("/signup");
    }
    return next();
  },
];

validation.addCategoryValidate = [
  check("category")
    .notEmpty()
    .withMessage("Category is required!")
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 character!"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(500).json({
      //   errors: errors.array(),
      // });
      req.flash("categoryError", errors.array());
      return res.redirect("/showcategory");
    }
    return next();
  },
];

validation.updateCategoryValidate = [
  check("category")
    .notEmpty()
    .withMessage("Category is required!")
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 character!"),
  check("status")
    .notEmpty()
    .withMessage("Status is required!")
    .isIn(["todo", "inprogress", "done"])
    .withMessage("Status must be either todo,inprogress or done!"),

  (req, res, next) => {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(500).json({
      //   errors: errors.array(),
      // });
      req.flash("updatecategoryError", errors.array());
      return res.redirect(`/getonecategory/${id}`);
    }
    return next();
  },
];

validation.addTaskValidate = [
  check("category")
    .notEmpty()
    .withMessage("Category is required!")
    .custom(async (value) => {
      const findcategory = await models.Category.findOne({
        where: { category: value },
      });
      if (!findcategory) {
        throw Error(`Category name doesnot exit!`);
      }
    }),
  check("task")
    .notEmpty()
    .withMessage("task is required!")
    .isLength({ min: 3 })
    .withMessage("task name must be at least 3 character!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(500).json({
      //   errors: errors.array(),
      // });
      req.flash("taskError", errors.array());
      return res.redirect("/showtask");
    }
    return next();
  },
];

validation.updateTaskValidate = [
  check("category")
    .notEmpty()
    .withMessage("Category is required!")
    .custom(async (value) => {
      const findcategory = await models.Category.findOne({
        where: { category: value },
      });
      if (!findcategory) {
        throw Error(`Category name doesnot exit!`);
      }
    }),
  check("task")
    .notEmpty()
    .withMessage("task is required!")
    .isLength({ min: 3 })
    .withMessage("task name must be at least 3 character!"),
  check("status")
    .notEmpty()
    .withMessage("Status is required!")
    .isIn(["todo", "inprogress", "done"])
    .withMessage("Status must be either todo,inprogress or done!"),
  (req, res, next) => {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(500).json({
      //   errors: errors.array(),
      // });
      req.flash("updatetaskError", errors.array());
      return res.redirect(`/getonetask/${id}`);
    }
    return next();
  },
];

module.exports = validation;
