const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Your email adress required"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "Your username is required"]
    },
    password: {
        type: String,
        required: [true, "Your email password is required"]
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    }, {
        collection: 'users',
        timestamps: true
    });

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

module.exports = mongoose.model('User', userSchema);
