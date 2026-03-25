const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/UserRoutes");

require("./database/db");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

app.use("/", userRoutes);

const port = 6111;
app.listen(port, () => {
    console.log(`server started at ${port}`);
})