require("dotenv").config();
const express = require("express");
const proxy = require("http-proxy-middleware");

const app = express();

app.use(express.static("public"));

const apiProxyTarget = process.env.API_PROXY_TARGET;
if (apiProxyTarget) {
  app.use("/graphql", proxy({ target: apiProxyTarget }));
}

const CLIENT_API_ENDPOINT =
  process.env.CLIENT_API_ENDPOINT || "http://localhost:3000/graphql";
const env = { CLIENT_API_ENDPOINT };

app.get("/env.js", function (req, res) {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

const port = process.env.CLIENT_SERVER_PORT || 5000;

app.listen(port, function () {
  console.log(`Client started on port ${port}`);
});