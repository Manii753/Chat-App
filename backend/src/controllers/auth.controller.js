import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    // Await the result of findOne to check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash the password and create a new user if the user does not exist
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate a token for the new user
    generateToken(newUser._id, res);

    return res.status(201).json({
      message: "User created successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    await bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }
      if (result) {
        generateToken(user._id, res);
        return res.status(200).json({
          message: "Login successful",
        });
      } else {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }
    });
  }catch (error) {
    console.log("Error in login controller:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  try { 
    res.cookie("jwt", "", {maxAge: 0});
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log("Error in logout controller:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if(!profilePic){
      return res.status(400).json({
        message: "Please provide a profile picture",
      });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    return res.status(200).json({
      message: "Profile updated successfully",
    });

  }catch{
    console.log("Error in updateProfile controller backend:");
    return res.status(500).json({
      message: "Internal server error",
    });

  }
  
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};