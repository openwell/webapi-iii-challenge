const express = require("express");
const userRoute = require("./posts/postRouter");
const server = express();

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use("/user", userRoute);

server.all("*", (req, res) => {
  res.redirect(301, "/user");
});
//custom middleware

function logger(req, res, next) {}

module.exports = server;
