const axios = require('axios');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password complexity
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: 'Password does not meet complexity requirements' });
    }

    // Check if username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    // Create a password hash
    const hashedPassword = await bcrypt.hash(password, 10); 

    // Create a new user in the database
    const newUser = await User.create({
      username,
      email,
      hashedPassword, 
    });

    // Send a success response
    res.status(201).json({ message: 'User registered successfully', user: newUser });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // check to see if the provided password matches the user password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid Password' });
    }
    
    //  successful login
      res.status(200).json({ message: 'Login successful', user: user.toJSON() });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
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
