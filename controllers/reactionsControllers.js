// Originally created, determined not to be needed
// const { Reactions, Thoughts } = require('../models');

// module.exports = {
//     async getReactions(req, res) {
//         try {
//             const reaction = await Reactions.find();
//             res.json(reaction);
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     },
//     async createReaction(req, res) {
//         try {
//           const reaction = await Reactions.create(req.body);
//           res.json(reaction);
//         } catch (err) {
//           res.status(500).json(err);
//         }
//     },
//     async deleteReaction(req, res) {
//         try {
//           const reaction = await Reactions.findOneAndDelete({ _id: req.params.reactionId });
//           if (!reaction) {
//             return res.status(404).json({ message: 'No reaction with that ID' });
//           }
//           res.json({ message: 'Reaction deleted!' })
//         } catch (err) {
//           res.status(500).json(err);
//         }
//     },
// }