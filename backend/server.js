import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";

connectDB()
.then(() => console.log("Database connected successfully"))
.catch((error) => console.error("Database connection failed:", error));

const app = express();
app.use(cors())

app.get('/', (req,res)=>{
    res.send("Api Is Working")
})

const Port = process.env.PORT || 5000;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});