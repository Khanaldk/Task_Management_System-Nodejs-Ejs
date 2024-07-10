const models = require("../models");

const categoryController = {};

categoryController.showAddCategory = async (req, res) => {
  return res.render("addCategory", { message: req.flash() });
};

categoryController.showUpdateCategory = async (req, res) => {
  return res.render("updateCategory", { message: req.flash() });
};

categoryController.showCategoryTaskPage = async (req, res) => {
  return res.render("categorytaskpage");
};

categoryController.addCategory = async (req, res) => {
  const newcategory = {
    category: req.body.category,
    status: "todo",
  };
  const createCategory = await models.Category.create(newcategory);
  if (createCategory) {
    // return res.status(200).json({
    //   message: "Category created successfully!",
    //   category: newcategory,
    // });
    return res.redirect("/getallcategory");
  }
};

categoryController.getAllCategory = async (req, res) => {
  const categorydata = await models.Category.findAll();
  if (categorydata) {
    res.render("categoryDashboard", { data: categorydata });
    // return res.status(200).json({
    //   message: "Category retrieved successfully!",
    //   data: categorydata,
    // });
  }
};
categoryController.getOneCategory = async (req, res) => {
  const categoryData = await models.Category.findOne({
    where: { id: req.params.id },
  });
  if (categoryData) {
    res.render("updateCategory", { data: categoryData, message: req.flash() });
  }
};

categoryController.updateCategory = async (req, res) => {
  const id = req.params.id;
  const updateDetails = {
    category: req.body.category,
    status: req.body.status,
  };
  const update = await models.Category.update(updateDetails, {
    where: { id: id },
  });
  if (update) {
    return res.redirect("/getallcategory");
  }
};

categoryController.deleteCategory = async (req, res) => {
  const id = req.params.id;
  const deleteCategory = await models.Category.destroy({ where: { id: id } });
  if (deleteCategory) {
    return res.redirect("/getallcategory");
  }
};

categoryController.getCategoryName = async (req, res) => {
  const categoryname = req.params.categoryname;
  const findcategory = await models.Task.findAll({
    where: { category: categoryname },
  });
  if (findcategory) {
    res.render("categorynamedetailsDashboard", {
      data: findcategory,
      count: findcategory.length,
    });
  }
};

module.exports = categoryController;
