import mongoose from 'mongoose'


const UserSchema=new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true,
            trim:true,
            unique : true 
        },
        userEmail:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            index:true,
        },
        userRole:{
            type:String,
            enum:['Candidate','Recruiter'],
            required:true,
        },
        userPassword : {
            type : String , 
            unique : false ,
            required : true ,
        }

    },
    {timestamps:true}
);

const User=mongoose.model('User',UserSchema);
export default User