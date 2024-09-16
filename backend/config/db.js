const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require('dotenv').config()



let db;

 const ConnectDB = async()=>{
    if(db) return db;
    const client = new MongoClient(process.env.MONGO_URI,{})

    try {
        await client.connect();
        db = client.db('test');
        console.log('Connected to database');
        return db;
      } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
      }
       


}

module.exports = ConnectDB;