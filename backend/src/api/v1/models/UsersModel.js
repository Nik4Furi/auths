const mongoose = require('mongoose');

//------------------ User schema to store the users ---------
const UserSchema = new mongoose.Schema({
    
    name: { type: String, required: true, minlength: [5, "Name must be 5 char long "], maxlength: [80, "Name mustn't 80 char long"], lowercase: true },

    email: {
        type: String, required: true, minlength: [5, "Email must be 5 char long "], maxlength: [120, "Email mustn't 120 char long"], unique: true, trim: true, lowercase: true, validate: {
            validator: function (value) {
                if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)))
                    throw new Error(`{VALUE} is not valid email`)
            }
        }
    },

    password: { type: String, required: true, minlength: [8, "Password must be 8 char long "], maxlength: [120, "Password mustn't 120 char long"] },

   dob : {type:Date,required:true}

}, { timestamps: true })


//Modal to which collection form we save the data
const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel