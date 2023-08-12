const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validator = require('validator');
const passwordValidator = require('password-validator');
const schema = new passwordValidator();
const bcrypt = require('bcrypt');

schema
  .is().min(8)
  .is().max(18)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().symbols()
  .has().not().spaces()

exports.registerUser = async (req, res) => {
  console.log("registerUser in controller hit");
  try {
    console.log("inside the try catch of registerUser");
    const { username, email, password } = req.body;
    console.log("username", username);

    // Check if required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    console.log("email", email);

    console.log("password", password);
    const validationResult = schema.validate(password);
    console.log("Validation Result:", validationResult);
    // Validate password complexity
    if (!schema.validate(password)) {
      return res.status(400).json({ error: 'Password does not meet complexity requirements' });
    }
    console.log("password", password);

    // Check if username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    // Create a password hash
    const hashedPassword = await bcrypt.hash(password, 10); 
    console.log("hash", hashedPassword);


    // Create a new user in the database
    const newUser = await User.create({
      username,
      email,
      password, 
    });
    console.log("newUser", newUser);

    console.log("about to save")
    // Save the new user to the database
    await newUser.save();
    console.log("new user saved");
    // Send a success response
    res.status(201).json({ message: 'User registered successfully', user: newUser });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
};

exports.loginUser = async (req, res) => {
  console.log("loginUser in controller hit");
  try {
    const { username, password } = req.body;
    console.log("username", username);
    console.log("password", password);

    // find user by name
    const user = await User.findOne({ username });
    console.log("user", user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // check to see if the provided password matches the user password
    console.log("password match attempt");
    console.log("given password", password);
    console.log('user.password:', user.password);
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid Password' });
    }
    console.log("after password match attempt");

    //  successful login
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};

exports.logoutUser = async (req, res) => {
  // Your user logout logic here...
};

exports.loginAnonymous = async (req, res) => {
  try {
    // Create an anonymous user (or find if already exists)
    const anonymousUsername = generateUniqueUsername();

    const user = new User({
      username: anonymousUsername,
    });
    await user.save()

    // Create and sign a JWT token for the anonymous user
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } 
    );

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
      },
      isAuthenticated: true,
    });
  } catch (error) {
    console.error('Anonymous login error:', error);
    return res.status(500).json({ error: 'An error occurred during anonymous login' });
  }
};

exports.getCurrentUserData = async (req, res) => {
  // Retrieve current user's data from req.user
  const currentUser = req.user;
  res.json(currentUser);
};
