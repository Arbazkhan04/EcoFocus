require('dotenv').config();
const express = require('express');
const connectDb = require('./db/connect.js')
const cors = require('cors');

const app = express();

const PORT  = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.raw());
app.use(cors())


//Start Block Accessing The Routes in the Entry Point
const userManagementRoutes = require('./routes/userManagementRouter.js');
const companyManagementRoutes = require('./routes/companyManagementRouter.js');
const requestManagementRoutes = require('./routes/requestManagementRouter.js');
const agencyManagementRoutes = require('./routes/agencyManagementRouter.js');

//start using routes
app.use('/api/userManagementRoutes',userManagementRoutes);
app.use('/api/companyManagementRoutes',companyManagementRoutes);
app.use('/api/requestManagementRoutes',requestManagementRoutes);
app.use('/api/agencyManagementRoutes',agencyManagementRoutes);
//end usng routes


//End Block Accessing The Routes in the Entry Point

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URL);
        console.log('Database connected')
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })   
    }
    catch(err) {
        console.log(err);
    }
}
start();
