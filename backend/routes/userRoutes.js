import express from 'express';
import User from '../models/User.js'
import multer from 'multer';
import fs from 'fs';
import path from 'path';


const router = express.Router();

// set multer for image upload 
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req,file,cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage})

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

// create user with image upload api

router.post("/", upload.single("profileImage") ,async (req,res)=>{
    const {phone,name} = req.body;

   try {
     let user = await User.findOne({phone:phone})
     if (user) {
        return res.status(400).json({message: "User already exists!"})
     }
     const profileImage = req.file ? `uploads/${req.file.filename}` : null;
     user = new User({phone ,name , profileImage})
     await user.save()

     res.status(201).json(user)
   } catch (error) {
    res.status(500).json({error: error.message })
   }
})
router.put("/:id" ,upload.single('profileImage'), async (req,res)=>{
    const {name} = req.body;

    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({message: "user not found"})
        }

        if (req.file) {

            const OldImagePath = path.join(process.cwd(),user.profileImage) 
            if (user.profileImage) {
                if (fs.existsSync(OldImagePath)) {
                    fs.unlinkSync(OldImagePath)
                }
            }
        }

        user.profileImage = `uploads/${req.file.filename}`

        if (name) {
            user.name = name;

        }
        await user.save()
        res.json(user)


    } catch (error) {
        res.status(500).json({error: error.message })
    }

})


export default router;