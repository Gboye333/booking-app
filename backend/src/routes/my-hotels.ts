import express, {Request, Response} from "express"; 
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/Hotel";
import verifyToken from "../middleware/auth";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024 //5mb
    }
})

router.post("/", 
verifyToken,
upload.array("imageFiles", 6), async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;
    
    //1. upload the images to cloudinary 

    const uploadPromises = imageFiles.map(async(image)=>{
    const b64 = Buffer.from(image.buffer).toString("base64")
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI)
    return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    //2. if upload was successful , add urls to the new hotel
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    //3. save the new hotel in our database
    const hotel = new Hotel(newHotel)
    await hotel.save();

    //4. return a 201 status
    res.status(201).send(hotel)
  } catch (error) {
    console.log("Error creating the hotel: ", error);
    res.status(500).json({message: "error while creating"})
  } 
});