import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Nitheesh")
})








app.listen(8000, () => {
  console.log("Server working on port 8000");
});
