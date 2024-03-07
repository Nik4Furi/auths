const jwt = require("jsonwebtoken"); // For verify the users

const UserModel = require("../models/UsersModel"); //User model to find the user

//--------- Fetch user help us, to find the token of the login users

const FetchUser = async (req, res, next) => {
    try {
        const token = req.header('auth-token');

        if (!token)
            return res.status(200).json({ success: false, msg: 'You are not authenticate user' });

        const Secret_Key = process.env.JWT_SECRET_KEY;
        const users = await jwt.verify(token, Secret_Key);


        //Find the user by the id
        const userFind = await UserModel.findById(users.user.id).select('-password');
        
        if (!userFind) return res.status(404).json({ success: false, msg: 'User not found' });

        req.user = userFind;

        next();

    } catch (error) { return res.status(500).json({ success: false, msg: error }); }
}

module.exports = FetchUser;