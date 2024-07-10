const express = require("express");
const categoryController = require("../controllers/categoryController");
const validation = require("../middleware/validation");

const catgeoryRoutes = express.Router();

catgeoryRoutes.get("/showcategory", categoryController.showAddCategory);
catgeoryRoutes.get(
  "/showupdatecategory",
  categoryController.showUpdateCategory
);
catgeoryRoutes.get(
  "/showcategorytaskpage",
  categoryController.showCategoryTaskPage
);

catgeoryRoutes.post(
  "/addcategory",
  validation.addCategoryValidate,
  categoryController.addCategory
);
catgeoryRoutes.get("/getallcategory", categoryController.getAllCategory);
catgeoryRoutes.get("/getonecategory/:id", categoryController.getOneCategory);
catgeoryRoutes.post(
  "/updatecategory/:id",
  validation.updateCategoryValidate,
  categoryController.updateCategory
);
catgeoryRoutes.post("/deletecategory/:id", categoryController.deleteCategory);
catgeoryRoutes.get(
  "/getcategoryname/:categoryname",
  categoryController.getCategoryName
);

module.exports = catgeoryRoutes;
