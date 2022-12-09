const art = require('../models/art')

async function getAll() {
    return await art.find({})
  }
  
  async function createArt(art) {
    return await art.create(art);
  }
  
  async function getById(id) {
    return art.findById(id)
  }
  
  async function deleteById(id) {
    return art.findByIdAndDelete(id);
  }
  
  async function updateById(id, data) {
    const existing = await art.findById(id);
  
    existing.title = data.title;
    existing.description = data.description;
    existing.category = data.category;
  
    return existing.save();
  }

  module.exports ={
    getAll,
    createArt,
    getById,
    deleteById,
    updateById
  }