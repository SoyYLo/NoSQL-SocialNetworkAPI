
const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  // Get single thought by ID
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a singal thought
  async getSingleThought(req, res) {
    try {
      const thoughts = await Thought.findOne({ _id: req.params.thoughtId })

      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create/add a thought
  async createThought(req, res) {
    try {
      const thoughts = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thoughts._id } },
        { new: true }
    );

    if (!user) {
        return res.status(404).json({
            message: 'Thought created, but no user found with that ID',
        });
    }

    res.json('Thought has been created!');
} catch (err) {
    console.log(err);
    res.status(500).json(err);
}
},
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
    );

    if (!user) {
        return res
            .status(404)
            .json({ message: 'Thought deleted' });
    }

    res.json({ message: 'Thought successfully deleted!' });
} catch (err) {
    res.status(500).json(err);
}
},
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
   // add a reaction to thought
   async createReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
},
 // remove a reaction from thought
 async removeReaction(req, res) {
  try {
      const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
      )

      if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
  } catch (err) {
      res.status(500).json(err);
  }
},
};

