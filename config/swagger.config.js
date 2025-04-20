const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Secure REST API with Node.js + MySQL",
            version: "1.0.0",
            description: "A secure Node.js API using MVC, Sequelize ORM, JWT auth, and Swagger docs.",
        },
        servers: [
            {
                url: "http://localhost:3000/api",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./routes/*.js", "./models/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
