const { createArt, getOwnerArt, getByDateAll } = require("../services/artService");
const User = require("../models/User");

const artController = require("express").Router();

artController.post('/art', async (req, res) => {
    const user = await User.findOne({ username: req.user.username })


    try {
        req.body.owner = user._id
        req.body.ownerUsername = user.username
        const art = await createArt(req.body)
        res.status(201).json(art)
    } catch (err) {

        res.status(400).json({ error: err.message })

    }
    res.end()
});


artController.get('/myArt', async (req, res) => {
    const art = await getOwnerArt(req.user._id)
    return res.status(200).json(art)
})

artController.get('/browse', async (req, res) => {
    try {
        const art = await getByDateAll()
        return res.status(200).json(art)

    } catch (error) {
        res.status(400).json({ error: err.message })
    }

})

module.exports = artController;
