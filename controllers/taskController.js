const models = require("../models");

const taskController = {};

taskController.showAddTask = async (req, res) => {
  return res.render("addTask", { message: req.flash() });
};

// taskController.showUpdateTask = async (req, res) => {
//   return res.render("updateTask", { message: req.flash() });
// };

taskController.addTask = async (req, res) => {
  const newTask = {
    task: req.body.task,
    category: req.body.category,
    status: "todo",
  };
  const createTask = await models.Task.create(newTask);
  if (createTask) {
    // return res.status(200).json({
    //   message: "Task created successfully!",
    //   category: newcategory,
    // });
    return res.redirect("/getalltask");
  }
};

taskController.getAllTask = async (req, res) => {
  const taskdata = await models.Task.findAll();
  if (taskdata) {
    res.render("taskDashboard", { data: taskdata });
    // return res.status(200).json({
    //   message: "Task retrieved successfully!",
    //   data: categorydata,
    // });
  }
};

taskController.getOneTask = async (req, res) => {
  const taskData = await models.Task.findOne({
    where: { id: req.params.id },
  });
  if (taskData) {
    res.render("updateTask", { data: taskData, message: req.flash() });
  }
};

taskController.updateTask = async (req, res) => {
  const id = req.params.id;
  const updateDetails = {
    task: req.body.task,
    category: req.body.category,
    status: req.body.status,
  };
  const update = await models.Task.update(updateDetails, {
    where: { id: id },
  });
  if (update) {
    return res.redirect("/getalltask");
  }
};

taskController.deleteTask = async (req, res) => {
  const id = req.params.id;
  const deleteTask = await models.Task.destroy({ where: { id: id } });
  if (deleteTask) {
    return res.redirect("/getalltask");
  }
};

taskController.showStatusDashboard = async (req, res) => {
  const taskdata = await models.Task.findAll();
  if (taskdata) {
    res.render("statusDashboard", { data: taskdata });
    // return res.status(200).json({
    //   message: "Task retrieved successfully!",
    //   data: categorydata,
    // });
  }
};

module.exports = taskController;
