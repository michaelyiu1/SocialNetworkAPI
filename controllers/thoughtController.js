const { Thought, User, Reaction } = require('../models');

//Aggregate function to get the number of reactions

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

  //Update Thought
  updateThought(req,res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$set: req.body},
      {runValidators: true}
      )
      .then((thought) => {
        if(!thought){
          return res.status(404).json({message: 'no thought found'})
        };
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Create a thought
  createThought(req,res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  //Delete a thought and remove it from the user
  deleteThought(req,res) {
    Thought.findOneAndRemove({_id: req.params.thoughId})
      .then((thought) => {
        if (!thought) {
          const message = res.status(404).json({message: 'no thought with this id'});
          return message;
        }

        return User.findOneAndUpdate(
          {thoughts: req.params.thoughtId},
          {$pull: {thoughts: req.params.thoughtId}},
          {new: true}
        );
      })
      .then((user) => {
        if (!user){
          res.status(404).json({message: "Thought deleted, but no user found"})
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
  addReaction(req,res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$addToSet: {reactions: req.body }},
      {runValidators: true, new: true}
    )
    .then((thought) => {
      if (!thought) {
        return res.status(404).json({message: 'no thought found'});
      }
      res.json(thought);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    })
  },

  //Delete Reaction from thought
  deleteReaction(req,res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      { $pull: {reactions: {reactionId: req.params.reactionId}}},
      { runValidators: true, new: true}
    )
    .then((thoughtData) => {
      if (!thoughtData) {
        const message = res.status(404).json({message: 'no thought with this id'});
        return message;
      }
      res.json(thoughtData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
  },

}