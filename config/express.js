const express = require("express");
const cookieParser= require('cookie-parser');
const session = require("../middlewares/session");


module.exports = (app) => {


  app.use("/static", express.static("static"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json())
  app.use(cookieParser());
  app.use(session())

};
