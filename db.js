const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
const connecttomongo = async()=>{
    await mongoose.connect(
        "mongodb+srv://ayushkaushal:ayushkaushal@cluster0.g4af0hk.mongodb.net/market?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    ),
    
    console.log("Connected to MongoDB Here");
    
    
      
    
};

connecttomongo();