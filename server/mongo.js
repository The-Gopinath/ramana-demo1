const mongoose=require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.mongo_url).then(()=>{
    console.log('database connected...');
}).catch((err)=>{
    console.log(err)
})

const eventSchema=new mongoose.Schema({
    name: String,
    date: String,
    day: String,
    time: String,
    photos: [String],
})

const eventModel=mongoose.model("event",eventSchema);
module.exports = eventModel;