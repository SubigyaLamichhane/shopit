import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import User from '../models/user.js'

// Checks if the user is authenticated or not.
export const isAuthenticatedUser = catchAsyncErrors( async (req, res, next)=>{
    const {token} =req.cookies
    if(!token){
        return next(new ErrorHandler('Not authorized to access this page.', 400));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);
    next();
})