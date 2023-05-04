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
      // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
      // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );

userSchema
    .virtual("freindCount")
    .get(function () {
        return this.friends.length;
    });

// Initialize our User model
const user = model('user', userSchema);

module.exports = user;