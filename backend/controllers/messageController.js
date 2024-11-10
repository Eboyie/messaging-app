import Conversation from '../models/conversationModel.js';
import Message from '../models/messageModel.js';
import { getReceiverSocketId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    //prevConversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.message.push(newMessage._id);
    }

    // this will run in parallel
    await Promise.all([newMessage.save(), conversation.save()]);

    // SOCKET IO FUNCTIONALITY STARTS HERE
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      //io.to(<socketId>).emit() to send events to a specific client
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChat] },
    }).populate('message'); // not ref but actual the messages

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.message;

    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
