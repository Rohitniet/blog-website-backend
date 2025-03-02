import express, { Request, Response } from "express"
import {z} from "zod"
import { blog_zod, signin_zod, signup_zod } from "./validation"
import bcrypt from "bcrypt"
import { blog_model, user_model } from "./db"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { middleware } from "./middleware"


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

userroute.post("/addblog",middleware ,async (req,res)=>{

    const validated= blog_zod.parse(req.body)
    //@ts-ignore
    const userid= req.id
   

    const  title= validated.title
    const  content= validated.content
    try{

    await blog_model.create({

        userid,
        title,
        content

    })
 
    res.json({
        "message":"your blog has been created"

    })

}catch(e){
    res.json({
        "error": e
    })
}
})


userroute.get("/allblog",middleware,async(req,res)=>{


    //@ts-ignore
    const userid = req.id
    console.log(userid)

    try{
    const blogs =await blog_model.find({
        userid
    })

    if(blogs){
        res.json({
            "blogs":blogs
        })
    }



}catch(e){

    res.json({
        "error": e
    })
}
})