const UserSchema= require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
exports.register = async (req, res) => {
    console.log(req.body);
    const username = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Check if user already exists
        const existingUser = await UserSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new UserSchema({
            username,
            password: hashedPassword,
            email
        });
        // Save the user to the database
       const userResponse= await newUser.save();
       console.log(userResponse);
       return res.status(200).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }   
        
};

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        // Find the user by email
        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        // Generate a JWT token
        const token = jwt.sign({ id: user._id,
                    username: user.username,
                    email: user.email },
                    process.env.JWT_SECRET, { expiresIn: '2m' });
        // Set the token in a cookie   
        return res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
