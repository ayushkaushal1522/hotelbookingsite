const express = require("express");
const app = express();
const mongoose = require("mongoose");
const seedDB = require('./seeddb')
const cors = require('cors');
const port = process.env.PORT || 8080;
const roomsRoute = require("./routes/roomsRoute"); 
const userRoutes = require("./routes/userRoutes"); 
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/rooms" , roomsRoute);
app.use("/api/users" , userRoutes);

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
    console.log(`server is running at port ${port}`);
})