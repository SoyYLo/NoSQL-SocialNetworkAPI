
const { User, Thought } = require('../models');

module.exports = {
  // Get all courses
  async getThought(req, res) {
    try {
      const thoughts = await Thought.find().populate('thoughts');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a course
  async getSingleThoughts(req, res) {
    try {
      const thoughts = await Thought.findOne({ _id: req.params.thoughtId })
        .populate('thoughts');

      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with that ID' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a course
  async createThought(req, res) {
    try {
      const thoughts = await Thought.create(req.body);
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a course
  async deleteThought(req, res) {
    try {
      const thoughts = await thoughts.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thoughts) {
        res.status(404).json({ message: 'No thought with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: User.thought } });
      res.json({ message: 'User and thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a course
  async updateThought(req, res) {
    try {
      const thought = await thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

