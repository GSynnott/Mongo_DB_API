const { Schema, model } = require('mongoose');
const { Reaction } = require('./reactions');

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
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    // toJSON: {
    //   virtuals: true,
    // },
    // id: false,
  }
);

// Schema to create User model
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
      // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
      // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );

thoughtsSchema
    .virtual("reactionsCount")
    .get(function () {
        return this.reactions.length;
    });


// Initialize our User model
const thoughts = model('thoughts', thoughtsSchema);

module.exports = thoughts;