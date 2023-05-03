const { Schema, model, Mongoose } = require('mongoose');

// Schema to create User model
const reactionsSchema = new Schema(
    {
      reactionID: {
        type: Mongoose.ObjectId,
        default: new Mongoose.ObjectId,
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
const reactions = model('reactions', reactionsSchema);

module.exports = reactions;