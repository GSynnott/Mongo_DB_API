const { Schema, model } = require('mongoose');
const Reaction = require('./reactions');

// Schema to create User model
const userSchema = new Schema(
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
      reactions: [
        {
            type: [Reaction],
            default: {},
        },
      ],
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

userSchema
    .virtual("reactionsCount")
    .get(function () {
        return this.reactions.length;
    });


// Initialize our User model
const thoughts = model('thoughts', thoughtsSchema);

module.exports = thoughts;