const { Schema, model } = require('mongoose');
//const { Reaction } = require('./reactions');

// Schema to create reactions model
const reactionsSchema = new Schema(
  {
    reactionID: {
      type: Schema.Types.ObjectId,
      default: Schema.Types.ObjectId,
    },
    reactionBody:{
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      ref: 'user',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: v => Date.toLocaleDateString("en-US"),
    },
  },
);

// Schema to create thoughts model
const thoughtsSchema = new Schema(
    {
      thoughtText: {
        type: String, 
        required: true,
        minLength: 1,
        maxLength: 280,
      },
      createdAt:{
        type: Date,
        default: Date.now,
        get: v => Date.toLocaleDateString("en-US"),
      },
      username: {
        type: String,
        required: true,
        ref: 'user',
      },
      reactions: [reactionsSchema],
    },
    {
      // Set up the model to allow virtuals
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );

// Create a virtual to count the number of items in the reactions array
thoughtsSchema
    .virtual("reactionsCount")
    .get(function () {
        return this.reactions.length;
    });


// Initialize our User model
const thoughts = model('thoughts', thoughtsSchema);

module.exports = thoughts;