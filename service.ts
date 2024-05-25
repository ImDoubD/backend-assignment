import Trade from './modal';
import csv from 'csv-parser';
import fs from 'fs';


export const parseCSV = (csvFilePath: string): Promise<any[]> => {
  const results: any[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        console.log("upload error: ",error);
        reject(error)
    });
  });
};

export const saveTrades = async (tradeData: any[]): Promise<void> => {
  await Trade.insertMany(tradeData);
};

export const calculateBalance = async (timestamp: string): Promise<Record<string, number>> => {
  const trades = await Trade.find({ utc_time: { $lte: new String(timestamp) } });
  const balance: Record<string, number> = {};
  trades.forEach((trade) => {
    const [base, _] = trade.market.split('/');
    if (!balance[base]) balance[base] = 0;
    balance[base] += trade.operation === 'Buy' ? trade.amount : -trade.amount;
  });
  return balance;
};





























// import { userRegistrationModel, movieRatingModel, genrePreferenceModal, movieRecommendFirstModal, movieRecommendSecondModal} from "./modal"


// export function userRegistrationService (
//     username: string,
//     genre_preferences: string[] | null
// ): Promise<any> {
//     return new Promise((resolve, reject) => {
//         userRegistrationModel(username, genre_preferences).then((results)=>{
//             resolve(results);
//         }).catch((error) => {
//             console.log("Error in inserting user registration: ", error);
//             reject("Internal server error in user registration");
//         })
//     })
// }


// export function movieRatingService (
//     username:string,
//     title:string,
//     rating: number
// ):Promise<any> {
//     return new Promise((resolve, reject) => {
//         if (rating < 1 || rating > 5) {
//             console.log("Error in providing rating: Rating must be between 1 and 5.");
//             reject("Rating must be between 1 and 5.");
//         } else {
//             movieRatingModel(username, title, rating).then((results)=>{
//                 resolve(results);
//             }).catch((error)=>{
//                 console.log("Error in providing rating: ", error);
//                 reject("Internal server error in user registration");
//             })
//         }
//     })
// }


// export function movieRecommendationService (
//     id: number
// ):Promise<any> {
//     return new Promise((resolve, reject) => {
//         genrePreferenceModal(id).then((genrePreference)=>{
//             console.log("preference:", genrePreference.rows[0].genre_preferences);
//             if (genrePreference.rows[0].genre_preferences === null) {
//                 movieRecommendFirstModal(id).then((results)=>{

//                     console.log("results 1:", results.rows);
//                     // resolve(results.rows);
//                     const resultMap = new Map();
//                     results.rows.forEach((movie) => {
//                         if(resultMap.has(movie.id)) {
//                             if(movie.rating > resultMap.get(movie.id).rating){
//                                 resultMap.set(movie.id, movie);
//                             }
//                         } else {
//                             resultMap.set(movie.id, movie);
//                         }
//                     })

//                     const resultSet = new Set(resultMap.values());
//                     console.log("results 2:", resultSet);
//                     const resultArray = Array.from(resultSet);
//                     resolve(resultArray);

//                 }).catch(error => {
//                     console.error("Error fetching movie recommendations 1:", error);
//                     reject("Internal server error in fetching movie recommendations 1");
//                 });
//             } else {
//                 movieRecommendSecondModal(id,genrePreference.rows[0].genre_preferences).then((results)=>{

//                     const resultMap = new Map();
//                     results.rows.forEach((movie) => {
//                         if(resultMap.has(movie.id)) {
//                             if(movie.rating > resultMap.get(movie.id).rating){
//                                 resultMap.set(movie.id, movie);
//                             }
//                         } else {
//                             resultMap.set(movie.id, movie);
//                         }
//                     })

//                     const resultSet = new Set(resultMap.values());
//                     console.log("results 2:", resultSet);
//                     const resultArray = Array.from(resultSet);
//                     if (resultArray.length < 5) {
//                         movieRecommendFirstModal(id).then((moreResults) => {
                            
//                             moreResults.rows.forEach((movie) => {
//                                 if (resultArray.length < 5 && !resultMap.has(movie.id)) {
//                                     resultArray.push(movie);
//                                 }
//                             });
//                             console.log("final results:", resultArray);
//                             resolve(resultArray);
//                         }).catch(error => {
//                             console.error("Error fetching additional movie recommendations:", error);
//                             reject("Internal server error in fetching additional movie recommendations");
//                         });
//                     } else {
//                         console.log("results 2:", resultArray);
//                         resolve(resultArray);
//                     }

//                 }).catch(error => {
//                     console.error("Error fetching movie recommendations 2:", error);
//                     reject("Internal server error in fetching movie recommendations 2");
//                 });
//             }
//         }).catch((error)=>{
//             console.error("Error fetching user genre preference:", error);
//             reject("Internal server error in fetching user genre preference");
//         })
//     })
// }



// {
//     "id": 1,
//     "name": "John Doe",
//     "contact": {
//         "email": "john.doe@example.com",
//         "phone": "123-456-7890"
//     },
//     "address": {
//         "city": "New York",
//         "state": "NY"
//     }
// }
// {
//     "id": 1,
//     "name": "Johnathan Doe",
//     "contact": {
//         "email": "johnathan.doe@example.com"
//     },
//     "address": {
//         "city": "Los Angeles",
//         "country": "USA"
//     }
// }



// {
//     "organization": {
//         "name": "Alice",
//         "title": "CEO",
//         "reports": [
//             {
//                 "name": "Bob",
//                 "title": "CTO",
//                 "reports": [
//                     {
//                         "name": "David",
//                         "title": "Dev",
//                         "reports": []
//                     },
//                     {
//                         "name": "Eve",
//                         "title": "Dev",
//                         "reports": []
//                     }
//                 ]
//             },
//             {
//                 "name": "Charlie",
//                 "title": "CFO",
//                 "reports": [
//                     {
//                         "name": "Frank",
//                         "title": "Fin",
//                         "reports": []
//                     },
//                     {
//                         "name": "Grace",
//                         "title": "Fin",
//                         "reports": []
//                     }
//                 ]
//             }
//         ]
//     },
//     // "employees": ["David", "Grace"]
// }

// function mergeObjects(obj1, obj2) {
//     // Function to flatten the object
//     function flatten(obj, path = []) {
//         let map = new Map();
//         for (let key in obj) {
//             if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
//                 let subMap = flatten(obj[key], path.concat(key));
//                 for (let [subKey, subValue] of subMap) {
//                     map.set(subKey, subValue);
//                 }
//             } else {
//                 map.set(path.concat(key).join('.'), obj[key]);
//             }
//         }
//         return map;
//     }

//     // Flatten both objects
//     let map1 = flatten(obj1);
//     let map2 = flatten(obj2);

//     // Update map1 with values from map2 if they are different
//     for (let [key, value] of map2) {
//         if (map1.has(key) && map1.get(key) !== value) {
//             map1.set(key, value);
//         } else if (!map1.has(key)) {
//             map1.set(key, value);
//         }
//     }

//     // Function to unflatten the map back to an object
//     function unflatten(map) {
//         let result = {};
//         for (let [key, value] of map) {
//             let keys = key.split('.');
//             keys.reduce((acc, curr, i) => {
//                 return acc[curr] || (acc[curr] = (i === keys.length - 1 ? value : {}));
//             }, result);
//         }
//         return result;
//     }

//     // Unflatten the map back to an object
//     return unflatten(map1);
// }

// // Example usage
// const obj1 = {
//     id: 1,
//     name: "John Doe",
//     contact: {
//         email: "john.doe@example.com",
//         phone: "123-456-7890"
//     },
//     address: {
//         city: "New York",
//         state: "NY"
//     }
// };

// const obj2 = {
//     id: 1,
//     name: "Johnathan Doe",
//     contact: {
//         email: "johnathan.doe@example.com"
//     },
//     address: {
//         city: "Los Angeles",
//         country: "USA"
//     }
// };

// const mergedObj = mergeObjects(obj1, obj2);
// console.log(mergedObj);
