const { Schema, model, Types } = require("mongoose");

const URL_PATTER = /^https?:\/\/.+$/i;

const artSchema = new Schema({
  title: { type: String,  minlength: [4, `Art Name must be at least 4 characters long`] },
  imageUrl: {
    type: String,
    validate: {
      validator: (value) => URL_PATTER.test(value),
      message: "Image URL is not valid",
    },
  },
  artCategory: { type: String, required: true, enum: ["Photography", "Painting", "Sculpture", "Architecture", "Music Cover"] },
  description: { type: String,  minlength: [10, `Description must be at least 10 characters long`] },
  rating: {type: Number },
  art: { type: [Types.ObjectId], ref: "User", default: [] },
  owner: { type: Types.ObjectId, ref: `User`},
});


artSchema.index({title:1},{
    collation:{
        locale:'en',
        strength:2
    }
})

const Art = model('Art', artSchema)

module.exports = Art