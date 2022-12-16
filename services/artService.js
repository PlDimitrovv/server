const art = require('../models/art')

async function getByDateAll() {
  return await art.find({}).sort({ "created_at": -1 })
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

async function getOwnerArt(id) {
  return art.find({ owner: id })
}

async function likes(id, userId) {
  const existingArt = await art.findById(id)
  
  if (existingArt.likes.some(u => (u.userId == userId))) {

  } else {
    existingArt.likes.push({ userId: userId, isLiked: true })
  }
  existingArt.likesCount = existingArt.likes.length
  existingArt.save()
  return existingArt
}

async function getByLikes(id) {
  const existingArt = await art.find().sort({likesCount:-1}).limit(3)
  return existingArt
}

module.exports = {
  getByDateAll,
  createArt,
  getById,
  deleteById,
  updateById,
  getOwnerArt,
  likes,
  getByLikes
}