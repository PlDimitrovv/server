//TODO replace with real controller by assignment

const artController = require("express").Router();

artController.get("/getAll", (req, res) => {
res.json({title:'TestCard', imgUrl:'Url', description:"BLABLA"})
});

module.exports = artController;
