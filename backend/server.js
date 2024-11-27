require('dotenv').config();
const express = require('express');
const connectDb = require('./db/connect.js')

const app = express();

const PORT  = process.env.PORT || 5000;


const start = async () => {
    try {
        await connectDb(process.env.MONGO_URL);
        console.log('Database connected')
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })   
    }
    catch(err) {
        console.log(err);
    }
}
start();
