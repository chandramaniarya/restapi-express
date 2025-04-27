const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const db = require("./models");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger.config");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

db.sequelize.sync({ force: true }).then(() => {
    console.log("Database connected");
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use('/api/category',require('./routes/category.routes'));

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
