const { Schema, model, Types } = require("mongoose");

const URL_PATTER = /^https?:\/\/.+$/i;

const artSchema = new Schema({
  title: { type: String, minlength: [5, `Art Name must be at least 5 characters long`] },
  imageUrl: {
    type: String,
    validate: {
      validator: (value) => URL_PATTER.test(value),
      message: "Image URL is not valid",
    },
  },
  artCategory: { type: String, required: true, enum: ["Photography", "Painting", "Sculpture", "Architecture", "Music Cover"] },
  description: { type: String, minlength: [10, `Description must be at least 10 characters long`] },
  rating: { type: [Types.ObjectId], default: [] },
  owner: { type: Types.ObjectId, ref: "User" },
  ownerUsername: { type: String }
},
  { timestamps: { createdAt: 'created_at' } });


artSchema.index({ title: 1 }, {
  collation: {
    locale: 'en',
    strength: 2
  }
})

const Art = model('Art', artSchema)

module.exports = Art