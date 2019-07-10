const express = require("express");
const userRoute = require("./users/userRouter");
const postRoute = require("./posts/postRouter");

const server = express();
server.use(express.json());

server.use(logger);
server.use("/api/user", userRoute);
server.use("/api/post", postRoute);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.all("*", (req, res) => {
  res.status(404).json('Sorry No Such Location');
});
//custom middleware

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now());
  next();
}

module.exports = server;
