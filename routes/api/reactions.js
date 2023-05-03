const router = require('express').Router();
const {
  getReactions,
  createReaction,
  deleteReaction,
} = require('../../controllers/reactionsControllers');

// /api/reactions
router
    .route('/')
    .get(getReactions)
    .post(createReaction);

// /api/reactions/:userId
router.route('/:reactionId')
    .delete(deleteReaction);

module.exports = router;