const { Schema, model } = require('mongoose');
const { Thought } = require('./thoughts');

// Schema to create User model
const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true, 
        required: true,
        trim: true,
      },
      email:{
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function(v) {
                return /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm.test(v);
            },
        },
      },
      thoughts: [
        {
            type: [Thought],
            default: {},
        },
      ],
      friends: [
        {
            type: [this],
            default: {},
        },
      ],
    },
    {
      // Set up the model to all virtuals
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );

// Set up a virtual to count the number of items in the friends field.
userSchema
    .virtual("freindCount")
    .get(function () {
        return this.friends.length;
    });

// Initialize our User model
const user = model('user', userSchema);

module.exports = user;