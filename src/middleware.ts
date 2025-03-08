import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv"
import jwt, { JwtPayload } from "jsonwebtoken"

dotenv.config()

const jwt_secret=process.env.jwt_secret


export async function middleware (req:Request,res:Response,next:NextFunction) {

    console.log("middleware")


    if(!jwt_secret){
     return
    }

    const token = req.headers.token
    if(typeof token === "string"){
       
        const user = await jwt.verify(token,jwt_secret)

        if(typeof user === "string"){
           return
        }else{

            const id  =  user.id

            //@ts-ignore
            req.id= id;

            next()



        }
    }else{
        return
    }

   

}