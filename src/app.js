import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cors({
    origin: "http://localhost:5173"||process.env.CORS_ORIGIN,
    credentials: true
}))
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  });
  
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "50mb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routers/user.routs.js'
import hotelRouter from "./routers/hotel.routs.js"
import AdminRouter from "./routers/admin.routs.js"

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/hotels",hotelRouter)
app.use("/api/v1/admin",AdminRouter)

export { app }