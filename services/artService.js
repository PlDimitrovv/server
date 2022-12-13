const art = require('../models/art')

async function getByDateAll() {
    return await art.find({}).sort({ "created_at": -1})
  }
  
  async function createArt(data) {
    return art.create(data);
    
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
    existing.artCategory = data.artCategory;
  
    return existing.save();
  }

  async function getOwnerArt(id){
    return art.find({owner: id})
  }

  module.exports ={
    getByDateAll,
    createArt,
    getById,
    deleteById,
    updateById,
    getOwnerArt
  }