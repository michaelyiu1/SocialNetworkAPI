const { Schema, Types } = require('mongoose');

//Construct a new instance of the schema class
const thoughtSchema = new Schema(
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

//Use mongoose.model() to compile a model based on the schema
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = assignmentSchema;
