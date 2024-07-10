const express = require("express");
const userController = require("../controllers/userController");
const validation = require("../middleware/validation");
const userRoutes = express.Router();

userRoutes.get("/home", userController.HomePage);
userRoutes.get("/signup", userController.SignUpPage);
userRoutes.get("/login", userController.LogInPage);

/**
 * @swagger
 *  components:
 *    schemas:
 *      user:
 *        type: objec
 *        required:
 *          - userName
 *          - email
 *          - password
 *          - confirmpassword
 *        properties:
 *          userName:
 *           type: string
 *           description: User's userName
 *          email:
 *           type: string
 *           description: User's email
 *           format: email
 *          password:
 *           type: string
 *           description: User's password
 *          confirmpassword:
 *           type: string
 *           description: User's confirmpassword
 *
 */

/**
 * @swagger
 * tags:
 *     name: User
 *     description: The user managing API endpoint
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create new user
 *     security:
 *       - jwt: []
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: Created User successfully
 *       500:
 *         description: Some Server Error
 */

userRoutes.post("/signup", validation.UserValidate, userController.SignUp);

/**
 * @swagger
 *  components:
 *    schemas:
 *      Login:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *           type: string
 *           description: User's Email
 *           example: 'task123@gmail.com'
 *          password:
 *           type: string
 *           description: User's Password
 *           example: 'taskmanagement123'
 *
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user
 *     security:
 *       - jwt: []
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User login successfully
 *       500:
 *         description: Some Server Error
 */

userRoutes.post("/login", userController.Login);

module.exports = userRoutes;
