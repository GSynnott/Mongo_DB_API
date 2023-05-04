const { User, Thoughts } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single user by their ID
    async getSingleUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
    },
    // Create a new user
    async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
    },
    // Update a user 
    async updateUser(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
          res.json(user);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
    },
    // Update a user to add friends
    async addFriends(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: req.params.friendID },
            { runValidators: true, new: true }
          );
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
          res.json(user);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
    },
    // Update a user to delete friends
    async deleteFriends(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: req.params.friendID },
            { runValidators: true, new: true }
          );
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
          res.json(user);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
    },
    // Delete a user and all thoughts for the user as well
    async deleteUser(req, res) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
          // Delete all thoughts that belong to that user
          await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
          res.json({ message: 'User and associated thoughts deleted!' })
        } catch (err) {
          res.status(500).json(err);
        }
    },
};