const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/courses/:userID
router
  .route('/:users')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

//api/users/:userId/friends/:friendID
router.route('/users/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
