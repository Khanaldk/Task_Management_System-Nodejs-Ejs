const express = require("express");
const swaggeruiexpress = require("swagger-ui-express");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerDocs = require("./docs/swaggerDocs");
const userRoutes = require("./routes/userRoutes");
const catgeoryRoutes = require("./routes/categoryRoutes");
const dotenv = require("dotenv");
const flash = require("connect-flash");
const session = require("express-session");
const taskRoutes = require("./routes/taskRoutes");
dotenv.config();
const app = express();

app.use(
  session({
    secret: "task management",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static("views"));

app.use("/", userRoutes);
app.use("/", catgeoryRoutes);
app.use("/", taskRoutes);

app.use(
  "/api-docs/",
  swaggeruiexpress.serve,
  swaggeruiexpress.setup(swaggerjsdoc(swaggerDocs))
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
