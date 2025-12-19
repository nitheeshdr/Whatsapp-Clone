import express from "express";

const app = express();

app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Nitheesh")
})








app.listen(8000, () => {
  console.log("Server working on port 8000");
});
