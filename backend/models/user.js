import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required'],
        maxLength: [30, 'Your naem can be maximum of 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Email cannot be empty'],
        unique: true,
        validate: [validator.isEmail, 'Email you entered was not valid']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [5, 'Password must be longer than 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

//Encrypting password
userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }

    this.password = await bcrypt.hash(this.password, 10);
});

//Return JSON Web Token
userSchema.methods.getJwt = () => {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

//Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

export default mongoose.model('User', userSchema);