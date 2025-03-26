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

userroute.get("/detail",middleware,async (req,res)=>{
    console.log("hitting it")

  try{
    //@ts-ignore
    const userid= req.id
    console.log(userid)
    const response =await user_model.findOne({
       "_id": userid
    })
    res.json({
        "user":response
    })
  }catch(e){
    res.json({
        "message":"error in fetching user"
    })
  }
    
})



userroute.post("/addblog",middleware ,async (req,res)=>{
    console.log("here is add blog")

    const validated= blog_zod.parse(req.body)
    //@ts-ignore
    const userid= req.id
    console.log(userid)
   

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
  

    try{
    const blogs =await blog_model.find({
        userid
    }).populate("userid")

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


userroute.delete("/delblog",middleware, async (req,res)=>{

    const title = req.body.title

    //@ts-ignore
    const userid= req.id
const founded = await blog_model.findOne({

    userid,
    title
})
if(founded){
    const result = await blog_model.deleteOne({
        userid,
        title
    })





    
    if(result){
        res.json({
            "message":"your blog has been deleted"
        })
    }else{
        res.json({
            "message":"error in deleting "
        })
    }

}else{
    res.json({
        "message":"your blog dosent exist"
    })
}



    
})

userroute.get("/share", middleware,async (req,res)=>{


    //@ts-ignore
    const userid=req.userid

    

    
})