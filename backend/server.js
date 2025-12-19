import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js"; // ← default import

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/chatappdb")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send("Nitheesh");
});

app.use("/api/users", userRoutes);

app.listen(8000, () => {
    console.log("Server working on port 8000");
});
