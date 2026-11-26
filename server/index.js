// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import route from './route/userRouter.js'; 

// const app=express();
// app.use(bodyParser.json());
// app.use(cors());
// dotenv.config();
// import dns from 'node:dns/promises';
// // Change DNS
// dns.setServers(["8.8.8.8", "1.1.1.1"]);


// const port =process.env.PORT || 8000;
// const URL=process.env.MONGOURL;
// // console.log(URL);


// app.get("/",(req, res)=>{
// res.send("this is root route");
// });

// mongoose.connect(URL).then(()=>{
//      console.log("DB is connected successfully");

//      app.listen(port, (req, res)=>{
//         console.log(`server is listening on port:${port}`);
//     });
    
// }).catch(error=>console.log(error));


// app.use("/api", route);


import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 8000;
const URL = process.env.MONGOURL;

mongoose.connect(URL)
    .then(() => {
        console.log("DB is connected successfully");

        app.listen(port, () => {
            console.log(`server is listening on port:${port}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
        process.exit(1);
    });