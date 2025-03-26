import express from "express"
import { blog_model } from "./db"



export const commonroute= express.Router()



commonroute.post('/blogs',async (req,res)=>{

const index=req.body.page ||1
const limit=8
const skip=(index-1)*limit

    try{
    const blogs= await blog_model.find().populate("userid").skip(skip).limit(8)

    res.json({
        "blogs":blogs
    })

    }catch(e){
        res.json({
            message:"error in reciving the blogs"
        })
    }
})