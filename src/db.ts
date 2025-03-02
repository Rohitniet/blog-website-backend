import mongoose, { model } from "mongoose"
import { string } from "zod"

const schema =mongoose.Schema

const objectid= schema.ObjectId


const user_schema= new schema({
    username: {type:String,unique:true},
    email:{type: String ,unique:true},
    password:String
})


const blog_schema= new schema({
    userid:objectid,
    title: String,
    content:String
})










export const user_model=  model("user",user_schema);
export const blog_model=  model("blog",blog_schema);