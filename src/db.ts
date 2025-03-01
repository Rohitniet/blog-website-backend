import mongoose, { model } from "mongoose"

const schema =mongoose.Schema

const objectid= schema.ObjectId


const user_schema= new schema({
    username: {type:String,unique:true},
    email:{type: String ,unique:true},
    password:String
})











export const user_model=  model("user",user_schema);