import User from '../models/user.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import sendToken from '../utils/jwtToken.js';

// Register a user => /api/v1/register
export const registerUser = catchAsyncErrors(async (req,res,next) => {
    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avoeiwhivweoubjvnweuigbvjkwe',
            url: 'nekhubvhewkaebndkejfkdnmkjhbdnmjfhbndkjfrhbjkhendkjrhfbndjhf'
        }
    })

    sendToken(user, 200, res);
})

// Login User => /api/v1/login
export const loginUser = catchAsyncErrors( async(req, res, next) => {
    const { email, password } = req.body;

    //Checks if email and password is entered by user 
    if(!email || !password){
        return next(new ErrorHandler('Enter the email and Password'));
    }

    //Finding user in database
    const user = await User.findOne({ email }).select('+password');
    if(!user){
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    //Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    sendToken(user, 200, res);
})