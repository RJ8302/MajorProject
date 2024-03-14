const express = require("express");
const app = express();
const cookieParser = require("cookie-parser"); 

app.use(cookieParser());

app.get("/getcookies", (req, res) => {
    res.cookie("greet", "namaste");
    res.cookie("madeIn", "India");
    res.send("send you some cookie");
});

app.get("/greet", (req, res) => {
    let {name = "anonymous"} = req.cookies;
    res.send(`Hi, ${name}`);
});

app.listen(3000, () => {
    console.log("server listening on port 3000");
});

app.get("/user", (req, res) => {
    res.send("GET for user");
});

app.get("/", (req, res) => {
    console.dir(req.cookies);
    res.send("Hi I am root");
});