import express, { Request, Response } from "express"
import {z} from "zod"
import { signin_zod, signup_zod } from "./validation"
import bcrypt from "bcrypt"
import { user_model } from "./db"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"


export const userroute= express.Router()
dotenv.config()

const jwt_secret =process.env.jwt_secret

userroute.post("/signup", async (req,res)=>{

    try{
 
    const validated= await signup_zod.parse(req.body)

    const email=validated.email;
    const password=validated.password;
    const username=validated.username;
    console.log(password)

    const hashpass=await bcrypt.hash(password,5);

    console.log(hashpass)


    await user_model.create({
        email,
        password :hashpass,
        username
    })

    res.json({
        "message":"you have signed up"
    })

}catch(e){
    res.json({
        "error":e
    })
}


})



//@ts-ignore will going to handel it later
userroute.post("/signin" , async(req: Request,res:Response) => {

    const validated=signin_zod.parse(req.body)

    const email=validated.email;
    const password=validated.password


    try{

        const user= await user_model.findOne({
            email
        })

        if(!user){
            return res.json({
                "message":"user not found"
            })
        }
        if(!user.password){
            return 
        }

        
        const security= await bcrypt.compare(password,user?.password)

        if(!security){
            res.json({
                "message":"incorrect password"
            })
        }


        const id= user._id


        //@ts-ignore
        const token= jwt.sign({id},jwt_secret)

        res.json({
            "token":token
        })

    }catch(e){

    }

})