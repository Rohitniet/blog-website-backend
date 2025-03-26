import express from "express"
import { userroute } from "./user"
import mongoose, { connections } from "mongoose"
import dotenv from "dotenv"
import { string } from "zod"
import cors from "cors"
import { commonroute } from "./common"
dotenv.config()



const db_string=process.env.db

const app=express()

app.use(express.json())
app.use(cors())


app.use("/user",userroute)
app.use("/common",commonroute)



async function start(){
   if(!db_string){
    return
   }
    

    const connection = await mongoose.connect("mongodb+srv://admin:zHj0B48rwT9ykOqc@admin1.as6ck.mongodb.net/blog")

    if(connection){

        console.log("db is connected")

    }

    app.listen(3000)
}

start()