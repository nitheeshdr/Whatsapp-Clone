import express from 'express';
import User from '../models/User'

const router = express.Router();

router.get('/:phone',async(req,res)=>{
    try {
        const user = await User.findOne({phone: req.params.phone})

        if (!user) {
            return res.status(404).json({message: "user not found"})
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})