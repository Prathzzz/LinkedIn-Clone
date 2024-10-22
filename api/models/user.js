const mongoose =require('mongoose');
const userschema= new mongoose.Schema({
name:{
    type:String,
    required:'please enter your name',
    trim:true
},
email:{
    type:String,
    required:'please enter email',
    unique:true,
    trim:true
},
password:{
    type :String,
    required:true,
},
verified:{
    type:Boolean,
    default:false,
},
verificationToken:String,
profileImage:String,
userDescription:{
    type:String,
    default:null
},
connections:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
],
connectionRequests:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
],
sentConnectionRequests:[
    {
       type:mongoose.Schema.Types.ObjectId,
       ref:"User" 
    }
],
posts:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }
],
createdAt:{
    type:Date,
    default:Date.now
}
})

const User = mongoose.model("User",userschema);
module.exports=User;