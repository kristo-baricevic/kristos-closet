const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const AuthService = {
  registerUser: async (userData) => {
    const { username, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return newUser;
  },

  loginUser: async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    return user;
  },

  generateToken: (user) => {
    const token = jwt.sign(
      { userId: user._id, username: user.username},
      'ladybug-soccer',
      { expiresIn: '1h'} 
    );

    return token;
  },
};

module.exports = AuthService;
