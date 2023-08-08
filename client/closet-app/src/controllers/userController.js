const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  // Your user registration logic here...
};

exports.loginUser = async (req, res) => {
  // Your user login logic here...
};

exports.logoutUser = async (req, res) => {
  // Your user logout logic here...
};

exports.loginAnonymous = async (req, res) => {
  // Your anonymous login logic here...
};

exports.getCurrentUserData = async (req, res) => {
  // Retrieve current user's data from req.user
  const currentUser = req.user;
  res.json(currentUser);
};
