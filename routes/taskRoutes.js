const express = require("express");
const taskController = require("../controllers/taskController");
const validation = require("../middleware/validation");
const taskRoutes = express.Router();

taskRoutes.get("/showtask", taskController.showAddTask);
// taskRoutes.get("/showupdatetask", taskController.showUpdateTask);

taskRoutes.post("/addtask", validation.addTaskValidate, taskController.addTask);
taskRoutes.get("/getalltask", taskController.getAllTask);
taskRoutes.get("/getonetask/:id", taskController.getOneTask);
taskRoutes.post(
  "/updatetask/:id",
  validation.updateTaskValidate,
  taskController.updateTask
);
taskRoutes.post("/deletetask/:id", taskController.deleteTask);

taskRoutes.get("/showstatusdashboard", taskController.showStatusDashboard);

module.exports = taskRoutes;
