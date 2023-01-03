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
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create viturla property 'friendCount' that gets the number of friends the user has
userSchema.virtual('friendCount').get(function () {
  return this.friends.length
});

// use the mongoose.model() to compile a model based on the schema
const User = model('user', userSchema);

module.exports = User;
