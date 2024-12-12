import User from "../models/user.model.js";
import Message from "../models/message.model.js";


export const getUsers = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const users = await User.find({ _id: { $ne: loggedInUser._id } }).select("-password");
    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.log("Error in getUsers controller: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export const getMessages = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id:userToChatId } = req.params;
    
    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: userToChatId },
        { sender: userToChatId, receiver: myId },
      ],
    });
    return res.status(200).json({
      message: "Messages fetched successfully",
      messages,
    });
  } catch (error) {
    console.log("Error in getMessages controller: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }

}

export const sendMessage = async(req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const { message , image} = req.body;

    let imageUrl;

    if(image){
      const result = await cloudinary.uploader.upload(image);
      imageUrl = result.secure_url;
    }

    const newMessage = new Message({
      senderId: myId,
      receiverId: userToChatId,
      text: message,
      image: imageUrl,
    });
    await newMessage.save();

    //  emit socket event

    return res.status(200).json({
      message: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    console.log("Error in sendMessage controller: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
    
  }
}
