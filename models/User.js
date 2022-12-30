const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max_length: 50,
      match: /.+\@.+\..+/,
    },
    thoughts: [thoughtSchema],
    friends: [userSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// use the mongoose.model() to compile a model based on the schema
const User = mongoose.model('user', userSchema);

module.exports = User;
