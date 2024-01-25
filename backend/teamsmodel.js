const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
    teamname:{
        type : String,
    },
    teamId:{
        type : String,
        unique : true
    },
    teamLeader:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    eventName:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    },
    status:{
        type:String,
        default: "not-submitted",
    },
    member: [
        {type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },]
});
module.exports = mongoose.model("Team", teamSchema);