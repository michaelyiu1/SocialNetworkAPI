const { Schema, Types } = require('mongoose');
const reactionSchema = require('./Reaction');
const datFormat = require('../utils/dateFormat');

//Construct a new instance of the schema class
const thoughtSchema = new mongoose.Schema(
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
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
