import mongoose from 'mongoose';

interface ITrade {
  user_id: string;
  utc_time: Date;
  operation: 'Buy' | 'Sell';
  market: string;
  amount: number;
  price: number;
}

const tradeSchema = new mongoose.Schema<ITrade>({
  user_id: { type: String, index: true },
  utc_time: { type: Date, index: true },
  operation: { type: String, enum: ['Buy', 'Sell'] },
  market: String,
  amount: Number,
  price: Number
}, {versionKey:false});

const Trade = mongoose.model<ITrade>('Trade', tradeSchema);
export default Trade;














// import { QueryResult } from "pg";
// import pool from "./db";
// import { 
//     userRegistrationQuery,
//     movieRatingQuery,
//     getGenrePreferenceQuery,
//     movieRecommendFirstQuery,
//     movieRecommendSecondQuery
// } from "./queries";

// export function userRegistrationModel(
//     username: string,
//     genre_preferences: string[] | null
// ): Promise<QueryResult<any>> {
//     return new Promise((resolve, reject) => {
//         pool.query(userRegistrationQuery,[username, genre_preferences], (error, results) => {
//             if(error){
//                 reject(error);
//             } else {
//                 resolve(results);
//             }
//         })
//     });
// }

// export function movieRatingModel(
//     username: string,
//     title: string,
//     rating: number
// ): Promise<QueryResult<any>> {
//     return new Promise((resolve, reject) => {
//         pool.query(movieRatingQuery,[username, title, rating], (error, results) => {
//             if(error){
//                 reject(error);
//             } else {
//                 resolve(results);
//             }
//         })
//     });
// }

// // export function movieRecommendationModel(
// //     username: string,
// // ): Promise<QueryResult<any>> {
// //     return new Promise((resolve, reject) => {
// //         pool.query(getGenrePreferenceQuery,[username], (error, results) => {
// //             if(error){
// //                 reject(error);
// //             } else {
// //                 resolve(results);
// //             }
// //         })
// //     });
// // }

// export function genrePreferenceModal(
//     id: number,
// ): Promise<QueryResult<any>> {
//     return new Promise((resolve, reject) => {
//         pool.query(getGenrePreferenceQuery,[id], (error, results) => {
//             if(error){
//                 reject(error);
//             } else {
//                 resolve(results);
//             }
//         })
//     });
// }

// export function movieRecommendFirstModal(
//     id: number,
// ): Promise<QueryResult<any>> {
//     return new Promise((resolve, reject) => {
//         pool.query(movieRecommendFirstQuery,[id], (error, results) => {
//             if(error){
//                 reject(error);
//             } else {
//                 resolve(results);
//             }
//         })
//     });
// }

// export function movieRecommendSecondModal(
//     id: number,
//     genre_preferences: string[]
// ): Promise<QueryResult<any>> {
//     return new Promise((resolve, reject) => {
//         pool.query(movieRecommendSecondQuery,[id,genre_preferences], (error, results) => {
//             if(error){
//                 reject(error);
//             } else {
//                 resolve(results);
//             }
//         })
//     });
// }