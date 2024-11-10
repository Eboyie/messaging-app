import bcrypt from 'bcryptjs';

import generateToken from '../utils/createTokens.js';
import User from '../models/userModel.js';

// @route POST /api/auth/signup
export const signup = async (req, res) => {
  try {
    const { fullName, username, gender, password, confirmPassword } = req.body;
    //check if all fields are filled
    if (!username || !gender || !password || !confirmPassword || !fullName) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    //check if user already exists
    const userExists = await User.findOne({ username });

    if (userExists)
      return res.status(400).json({ message: 'Username already exists' });

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(res, newUser._id);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @route POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!username || !password) {
      return res.status(400).json({ message: 'Please add all fields' });
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      user?.password || ''
    );

    if (!user || !isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
};

// @route POST /api/auth/logout
export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
