const express = require("express");
const app = express();
const mongoose = require("mongoose");
const seedDB = require('./seeddb')
const port = process.env.PORT || 8080;
const roomsRoute = require("./routes/roomsRoute"); 
require("dotenv").config();



app.use("/api/rooms" , roomsRoute);
mongoose.set('strictQuery', true);
const connecttomongo = async()=>{
    await mongoose.connect(
        process.env.MONGOURL,
        // { useNewUrlParser: true, useUnifiedTopology: true }
    ),
    
    console.log("Connected to MongoDB Here");
    
    
      
    
};

connecttomongo();
// seedDB();


app.listen(port ,()=>{
    console.log(`server is runnign at port ${port}`);
})