// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // Get all Users
  getUsers(req,res) {
    User.find().select('__v').populate('friends').populate('thoughts')
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    })
  },

  //Get single user
  getSingleUser(req,res) {
    User.find({_id: req.params.userId}).populate('friends').populate('thoughts')
    .then((userData) => {
      if(!userData){
        return res.status(404).json({message: 'no user found'});
      }
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    })
  },

  //Create a new User
  createUser(req,res) {
    User.create(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err)
    })
  },

  //Update User info
  updateUser(req,res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$set: req.body},
      {runValidators: true, new: true}
      )
    .then((userData) => {
      if(!userData){
        return res.status(404).json({message: 'no user found'})
      }
      res.json(userData)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
  },

  //Add friend
  addFriend(req,res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$addToSet: {friends: req.body }},
      {runValidators: true, new: true}
      )
    .then((userData) => {
      if(!userData){
        return res.status(404).json({message: 'no user found'})
      }
      res.status(200).json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
  },

  //Delete Friend
  deleteFriend(req,res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      { $pull: {friends: {friendId: req.params.friendId}}},
      {runValidators: true, new: true}
      )
    .then((userData) => {
      if(!userData){
        return res.status(404).json({message: 'no user found'})
      }
      res.status(200).json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
  },

}
