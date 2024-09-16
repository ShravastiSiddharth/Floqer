const express = require('express');
const cors = require('cors');
require('dotenv').config();
const ConnectDB = require('./config/db')
const SalayRoutes = require('./routes/salaryRoute')
const gorqRoutes = require('./routes/gorqRoute');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api',SalayRoutes);
app.use('/api/gorq', gorqRoutes);

ConnectDB();
app.listen(PORT,()=>{
    console.log("Server Running on Port:", PORT)
})
