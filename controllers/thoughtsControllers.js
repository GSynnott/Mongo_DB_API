const { Thoughts } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thought = await Thoughts.find();
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single thought by ID
    async getSingleThought(req, res) {
        try {
          const thought = await Thoughts.findOne({ _id: req.params.thoughtId })
            .select('-__v');
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
    },
    // Create a new thought
    async createThought(req, res) {
        try {
          const thought = await Thoughts.create(req.body);
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
    },
    // Update a thought
    async updateThought(req, res) {
        try {
          const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
          res.json(thought);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
          const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
          res.json({ message: 'Thought deleted!' })
        } catch (err) {
          res.status(500).json(err);
        }
    },
};