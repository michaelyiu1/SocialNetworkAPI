const { Thought, User } = require('../models');

module.exports = {
  //Get all Thoughts
  getThoughts(req,res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //Get a single Thought
  getSingleThought(req,res) {
    Thought.findOne({_id: req.params.thoughtId})
      .select('-__v')
      .then((thought) => 
        !thought
          ? res.status(404).json({message: 'No thought with this ID'})
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Create a thought
  createThought(req,res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  //Delete a thought and remove it from the User
  deleteThought(req,res) {
    Thought.findOneAndRemove({_id: req.params.thoughId})
      .then((thought) => 
        !thought
          ? res.status(404).json({message: "No such thought exists"})
          : Thought.findOneAndUpdate(
            {thoughts: req.params.thoughtId},
            {$pull: {thoughts: req.params.thoughtId}},
            {new: true}
          )
      )
      .then((thought) => {
        if (!thought){
          res.status(404).json({message: "Thought deleted, but no User found"})
        } else {
          res.json({message: 'Thought successfully deleted'})
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a reaction to the thought

}