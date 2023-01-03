const { Schema, Types, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const datFormat = require('../utils/dateFormat');

//Construct a new instance of the schema class
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      get: timestamp => dateFormat(timestamp),
    },
    reactions: [reactionSchema],
  }
);

// Create virtual to get number of reactions
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
})

//Use mongoose.model() to compile a model based on the schema
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
