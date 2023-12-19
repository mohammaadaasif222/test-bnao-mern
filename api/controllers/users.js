import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user:process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD, 
  },
});

export const getUsers = async (request, response) => {
  try {
    const users = await User.find(id);
    response.status(200).json(users);
  } catch (error) {
    response.status(404).json({
      message: error.message,
    });
  }
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;
 
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const resetToken = uuidv4();

    const jwtToken = jwt.sign({ id: user._id, resetToken }, process.env.JWT_SECRET, {
      expiresIn: '1h', 
    });
    user.resetPasswordToken = jwtToken;
    user.resetPasswordExpiry = Date.now() + 3600000; 
    await user.save();

  
    
    await transporter.sendMail({
      from: 'mohammadblog@gmail.com',
      to: email,
      subject: 'Password Reset',
      html: `<p>Click <a href="http://localhost:5173/reset-password/${jwtToken}">here</a> to reset your password.</p>`,
    });
    


    res.status(200).json({ message: 'Reset token generated and sent to the ' + email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const resetPassword = async (req, res)=>{
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() }, 
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    
    const hashedPassword = bcryptjs.hashSync(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}