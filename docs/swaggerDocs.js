module.exports = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      version: "1.0.0",
      title: "Task Management System Project Api",
      description: "It manages the task.",
      servers: ["http://localhost:5000"],
    },
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["routes/*.js"],
};
