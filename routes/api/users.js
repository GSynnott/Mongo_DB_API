const router = require('express').Router();
// Import all user modules from the controller
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  addFriends,
  deleteFriends,
  deleteUser,
} = require('../../controllers/usersControllers');

// /api/users
router
    .route('/')
    .get(getUsers)
    .post(createUser);

// /api/users/:userId
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendsId
router.route('/:userId/friends/:friendsId')
    .put(addFriends)
    .delete(deleteFriends);

module.exports = router;