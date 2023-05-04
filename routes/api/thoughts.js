const router = require('express').Router();
// Import all thoughts modules from the controller
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtsControllers');

// /api/users
router
    .route('/')
    .get(getThoughts)
    .post(createThought);

// /api/users/:userId
router.route('/:thoughtsId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;