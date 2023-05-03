const { Thoughts } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thought = await Thoughts.find();
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
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
    async createThought(req, res) {
        try {
          const thought = await Thoughts.create(req.body);
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
    },
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