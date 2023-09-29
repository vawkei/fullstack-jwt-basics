const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
//require("express-async-errors")

const login = require ("./src/backend/routes/main")
const dashboard = require ("./src/backend/routes/main")
//const errorHandlerMiddleware = require("./src/backend/middlewares/error-handler")

app.use(express.json());
app.use(cors());

app.use("/api/v1/",login);
app.use("/api/v1/",dashboard)


//app.use(errorHandlerMiddleware)
app.listen(8000,"localhost",()=>{
    console.log("it's on")
    console.log("Server listening on port 8000")
});