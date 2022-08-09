import dotenv from 'dotenv';

import app from './app.js';
import connectDatabase from './config/database.js';

//Handle Uncaught Exceptions
process.on('uncaughtException', err=>{
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exceptions');
    process.exit(1);
})

//Setting up config file
dotenv.config({path: 'backend/config/config.env'});

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', err=>{
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');
    server.close(()=>{
        process.exit(1);
    });
});