const express = require("express");
const userRoute = require("./posts/postRouter");
const server = express();

server.use(logger);
server.use("/user", userRoute);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.all("*", (req, res) => {
  res.redirect(301, "/user");
});
//custom middleware

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now());
  next();
}

module.exports = server;
