const { createArt, getOwnerArt, getByDateAll, getById, updateById, deleteById, likes, getByLikes } = require("../services/artService");
const User = require("../models/User");

const artController = require("express").Router();

artController.post('/art', async (req, res) => {
    const user = await User.findOne({ username: req.user.username })

    try {
        req.body.owner = user._id
        req.body.ownerUsername = user.username
        const art = await createArt(req.body)
        res.status(201).json(art)
    } catch (error) {

        res.status(400).json({ error: error.message })

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
        res.status(400).json({ error: error.message })
    }

})

artController.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const art = await getById(id)

        if (art) {
            res.status(200).json(art)
        } else {
            throw new Error('Invalid ID')
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

artController.put('/:id', async (req, res) => {
    const id = req.params.id
    const data = req.body
    const art = await getById(id)

    try {
        if (req.user._id == art.owner._id) {
            await updateById(id, data)
            const updateArt = await getById(id)
            res.status(200).json(updateArt)

        } else {
            throw new Error('You do not have access to this ID!')
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

artController.delete('/:id', async (req, res) => {
    const art = await getById(req.params.id);

    if (art.owner != req.user._id.toString()) {
        throw new Error('You are not Authorized!')
    }

    await deleteById(req.params.id);
})

//get top 3

artController.get('/', async(req,res) =>{
    const art = await getByLikes()
    res.status(200).json(art)
})

//likes

artController.post('/like/:id', async (req, res) => {
    try {
        const artId = req.params.id;
        const userId = req.user._id
        const updatedArt = await likes(artId, userId)
        res.status(200).json(updatedArt)
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = artController;
