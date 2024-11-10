import User from '../models/userModel.js';

export const getUserForSidebar = async (req, res) => {
  try {
    const loginUserId = req.user._id;

    //get all users except login user
    const filteredUsers = await User.find({ _id: { $ne: loginUserId } }).select(
      '-password'
    );

    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
