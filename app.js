import express from "express";
import cors from "cors"; // 1. Import cors
import cookieParser from "cookie-parser"; 
import route from "./src/routes/user.routes.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();


app.use(cors({
  origin: process.env.CORS_ORIGIN, 
  credentials: true
}));



app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser()); 


// API routes
app.use("/api/user", route);

export default app;