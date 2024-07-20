require("dotenv").config();
const cors = require("cors");
const Controller = require("./Contoller/Controller");
const MiddleWare = require("./MiddleWare/MiddleWare");
const express = require("express");
require("./Db/config");
const port = process.env.Base_url || 8000;
const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", MiddleWare.signupValidation, Controller.userRegistration);

app.post("/login", Controller.userLogin);

app.get("/dashboard/:id", MiddleWare.JwtVerifiedToken, Controller.getUser);

app.listen(port, () => {
  console.log("server is running port", port);
});
