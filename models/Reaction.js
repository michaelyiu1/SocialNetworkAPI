const { Schema, Types } = require('mongoose');
const datFormat = require('../utils/dateFormat');

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
      get: timestamp => dateFormat(timestamp)
    },

  }
);

module.exports = reactionSchema;