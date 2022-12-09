const { createArt } = require("../services/artService");

const artController = require("express").Router();

artController.get("/getAll", (req, res) => {
res.json({title:'TestCard', imgUrl:'Url', description:"BLABLA"})
});


artController.post('/', async (req,res) => {
const art = {
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    category:req.body.category,
    description:req.body.description,
    owner:req.user._id
}

try {
    await createArt()
    res.status(200).json()
} catch (error) {
     res.status(400).json({error:error.message})
}


});

module.exports = artController;
