const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// /api/students
router.route('/').get(getThoughts).post(createThought);

// /api/students/:studentId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router
.route('/:thoughtId/reactions')
.post(createReaction)

router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction)

module.exports = router;
