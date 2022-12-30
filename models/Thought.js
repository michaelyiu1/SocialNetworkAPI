const { Schema, Types } = require('mongoose');

const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
    },

  }
);


//Construct a new instance of the schema class
const thoughtSchema = new mongoose.Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    reaction: [reactionSchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

//Use mongoose.model() to compile a model based on the schema
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
