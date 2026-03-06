import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const jwt_refresh_token_expires_in = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN;
const generate_access_token_secret_key = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
const generate_refresh_token_secret_key = process.env.REFRESH_TOKEN_SECRET_KEY;
const jwt_access_token_expires_in = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN;

const generateAccestoken=(user)=>{
        const payload={
            userId:user._id,
            userEmailFromAccessToken:user.userEmail,
            userNameFromAccessToken:user.userName,
            useRoleFromAccessToken:user.useRole
            
        }
        const accessToken=jwt.sign(payload,generate_access_token_secret_key,{expiresIn:jwt_access_token_expires_in});
        return accessToken;  
}
const generateRefreshToken=(user)=>{
    const payload={
            userId:user._id,
            userEmailFromRefreshToken:user.userEmail,
            userNameFromRefreshToken:user.userName,
            useRoleFromRefreshToken:user.useRole
    }
    const RefreshToken=jwt.sign(payload,generate_refresh_token_secret_key,{expiresIn:jwt_refresh_token_expires_in});
    return RefreshToken;
}

const RegisterUser=async (req,res)=>{
    try{
        const {username,useremail,userpassword,userrole}=req.body;
        if(!username || !useremail || !userpassword||!userrole)
        {
            return res.status(400).json({
                success: false,
                message: "All fields are required . Email , username and password is mandatory"
            })
        }

        const existingUser=await User.findOne({
            $or:[
                {userName:username},
                {userEmail:useremail}
            ]
        })
        if(existingUser)
        {
            return res.status(400).json(
                {
                    success: false,
                    message: "User with given email or username already exists"
                }
            )
        }

        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(userpassword,salt);

        const newUser=await User.create({
            userName: username,
            userEmail: useremail,
            userPassword:hashPassword,
            userRole:userrole
        })
       // await newUser.save();

        const accessToken=generateAccestoken(newUser);
        const RefreshToken=generateRefreshToken(newUser);

        if(newUser)
        {
            return res.status(201).json(
                {
                    success:true,
                    message:"New User Created Succesfully!",
                    data:newUser,
                    accessToken:accessToken,
                    RefreshToken:RefreshToken,
                }
            )
        }
        else {
            return res.status(500).json({
                success: false,
                message: "Failed to register user"
            })
        }
    }
    catch(error)
    {
        console.log("Server Error",error);
        res.status(500).json(
            {
                success:false,
                message:"INTERNAL SERVER ERROR"
            }
        )
    }
}

const LoginUser=async(req,res)=>{
    try{
        const {useremail,userpassword}=req.body;
        if(!useremail || !userpassword)
        {
            return res.status(401).json(
                {
                    success:false,
                    message:"Fields are Empty..Please fill up the fields"
                }
            )
        }
        const finduser=await User.findOne({
            userEmail:useremail
        })
        if(!finduser)
        {
            console.log("User not found");
            return res.status(404).json({
                success : false,
                message : "User with given email does not exists"
            })
        }
        const isCorrectPassword= await bcrypt.compare(userpassword,finduser.userPassword);

        if(!isCorrectPassword)
        {
            return res.status(400).json({
                success : false,
                message : "Invalid credentials!!"
            })
        }
        const accessToken=generateAccestoken(finduser);
        const RefreshToken=generateRefreshToken(finduser);

        return res.status(200).json(
            {
                success:true,
                message:"User logged in succesfully!!",
                data:finduser,
                accessToken:accessToken,
                RefreshToken:RefreshToken,

            }
        )
    }    
    catch(error)
    {
        console.log("Error in login controller",error);
        res.status(500).json(
            {
                success:false,
                message:"INTERNAL SERVER ERROR"
            }
        )
    }
}
const updateUsername=async(req,res)=>{
    try{
        const {newusername,oldusername}=req.body;
        if(!oldusername || !newusername) {
            return res.status(400).json(
                {
                    success:false,
                    message:"Username is missing . Pls give the new username to update it"
                }
            )
        }
        const finduser=await User.findOne({userName:oldusername});
        if(!finduser)
        {
            return res.status(404).json(
                {
                    success: false,
                    message: "User does not exist .Pls provide me a correct username"
                }
            )
        }
        const checkExistingUser=await User.findOne({userName:newusername});
        if(checkExistingUser)
        {
             return res.status(409).json({
                    success: false,
                    message: "User with given username already exists . Pls provide a different username"
            })
        }
        const updateUser=await User.updateOne({userName:oldusername}, {$set:{userName:newusername}});
        if(updateUser.modifiedCount === 0)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Failed to update the username of the user"
                }
            )
        }

        const updatedusername=await User.findOne({userName:newusername})
        const userData = {
            _id:updatedusername._id,
            userName:updatedusername.userName,
            userEmail:updatedusername.userEmail,
            userRole:updatedusername.userRole
        }
        return res.status(201).json({
            success:true,
            message:"Username is updated succesfully",
            data:userData
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "INTERNAL SERVER ERROR "
        })
    }
}





export{
    RegisterUser,LoginUser,updateUsername
}
