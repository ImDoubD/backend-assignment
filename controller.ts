import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { userRegistrationService, movieRatingService, movieRecommendationService } from "./service";

const userRegistration = (req: Request, res: Response):void =>{
    try{
        const {username, genre_preferences} = req.body;
        userRegistrationService(username, genre_preferences).then((results) =>{
            res.status(200).send({message: "user successfully inserted!"})
        }).catch((error)=>{
            res.status(500).send({message: "internal server error 1"});
        })
    }
    catch(error){
        res.status(500).send({message: "internal server error 2"});
    }
}

const movieRating = (req: Request, res: Response):void =>{
    try{
        const {username, title, rating} = req.body;
        movieRatingService(username, title, rating).then((results) =>{
            res.status(200).send({message: "movie successfully rated!"})
        }).catch((error)=>{
            res.status(500).send({message: "internal server error 1 in rating"});
        })
    }
    catch(error){
        res.status(500).send({message: "internal server error 2 in rating"});
    }
}

const movieRecommendation = (req: Request, res: Response):void =>{
    try{
        const id: number = parseInt(req.headers.id as string); 
        movieRecommendationService(id).then((results) =>{
            res.status(200).send(results)
        }).catch((error)=>{
            res.status(500).send({message: "internal server error 1 in recommendation"});
        })
    }
    catch(error){
        res.status(500).send({message: "internal server error 2 in recommendation"});
    }
}


export{
    userRegistration,
    movieRating,
    movieRecommendation
};