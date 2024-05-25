import { Request, Response } from 'express';
import multer from 'multer';
import { parseCSV, saveTrades, calculateBalance } from './service';
import Trade from './modal';

const upload = multer({ dest: 'uploads/' });

export const saveAndUploadCSV = async (req: Request, res: Response) => {
    try {
        if (!req.file) throw new Error('File must be provided.');
        const tradeData = await parseCSV(req.file.path);
        
        const tradePromises = tradeData.map((trade) => {
            
            const [date, time] = trade.utc_time.split(' ');
            const [day, month, year] = date.split('-');
            const correctFormat = `${year}-${month}-${day}T${time}`;

            const utcDate = new Date(correctFormat);

            const tradeObj = new Trade({
                user_id: trade.user_id,
                utc_time: utcDate.toISOString(),
                operation: trade.operation,
                market: trade.market,
                amount: Number(trade.amount),
                price: Number(trade.price)
            });
            return tradeObj.save();
        });
  
        await Promise.all(tradePromises);
  
        res.status(200).send('Trades uploaded and saved successfully');
    } catch (error) {
        console.error("Error in save and upload:", error);
        res.status(500).send({ "error in save and upload": error });
    }
};

  
  

export const balanceCalculator = async (req: Request, res: Response) => {
    try { 
        const timestamp: string = req.body.timestamp; 
        if (!timestamp) throw new Error('Timestamp must be provided.');

        const [date, time] = timestamp.split(' ');
        const [day, month, year] = date.split('-');
        const correctFormat = `${year}-${month}-${day}T${time}`;

        const isoTimestamp = new Date(correctFormat).toISOString();

        const balance = await calculateBalance(isoTimestamp); 
        res.status(200).json(balance);
    } catch (error) {
        console.log("error in balance: ",error);
        res.status(500).send({"error in balance calculation": error});
    }
};


































// import { Request, Response } from "express";
// import asyncHandler from "express-async-handler";
// import { userRegistrationService, movieRatingService, movieRecommendationService } from "./service";

// const userRegistration = (req: Request, res: Response):void =>{
//     try{
//         const {username, genre_preferences} = req.body;
//         userRegistrationService(username, genre_preferences).then((results) =>{
//             res.status(200).send({message: "user successfully inserted!"})
//         }).catch((error)=>{
//             res.status(500).send({message: "internal server error 1"});
//         })
//     }
//     catch(error){
//         res.status(500).send({message: "internal server error 2"});
//     }
// }

// const movieRating = (req: Request, res: Response):void =>{
//     try{
//         const {username, title, rating} = req.body;
//         movieRatingService(username, title, rating).then((results) =>{
//             res.status(200).send({message: "movie successfully rated!"})
//         }).catch((error)=>{
//             res.status(500).send({message: "internal server error 1 in rating"});
//         })
//     }
//     catch(error){
//         res.status(500).send({message: "internal server error 2 in rating"});
//     }
// }

// const movieRecommendation = (req: Request, res: Response):void =>{
//     try{
//         const id: number = parseInt(req.headers.id as string); 
//         movieRecommendationService(id).then((results) =>{
//             res.status(200).send(results)
//         }).catch((error)=>{
//             res.status(500).send({message: "internal server error 1 in recommendation"});
//         })
//     }
//     catch(error){
//         res.status(500).send({message: "internal server error 2 in recommendation"});
//     }
// }


// export{
//     userRegistration,
//     movieRating,
//     movieRecommendation
// };