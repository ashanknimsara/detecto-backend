const { timeStamp } = require('console');
const { Schema, model, default: mongoose } = require('mongoose');


const videoSchema = new mongoose.Schema(
    {
        videoUrl:{
            type:String,
            required:true
        }
    },
    {
        timeStamp:true,
    }
)
const VideoModel = model('Video',videoSchema);
module.exports = VideoModel;
