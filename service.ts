import { userRegistrationModel, movieRatingModel, genrePreferenceModal, movieRecommendFirstModal, movieRecommendSecondModal} from "./modal"


export function userRegistrationService (
    username: string,
    genre_preferences: string[] | null
): Promise<any> {
    return new Promise((resolve, reject) => {
        userRegistrationModel(username, genre_preferences).then((results)=>{
            resolve(results);
        }).catch((error) => {
            console.log("Error in inserting user registration: ", error);
            reject("Internal server error in user registration");
        })
    })
}

export function movieRatingService (
    username:string,
    title:string,
    rating: number
):Promise<any> {
    return new Promise((resolve, reject) => {
        if (rating < 1 || rating > 5) {
            console.log("Error in providing rating: Rating must be between 1 and 5.");
            reject("Rating must be between 1 and 5.");
        } else {
            movieRatingModel(username, title, rating).then((results)=>{
                resolve(results);
            }).catch((error)=>{
                console.log("Error in providing rating: ", error);
                reject("Internal server error in user registration");
            })
        }
    })
}


export function movieRecommendationService (
    id: number
):Promise<any> {
    return new Promise((resolve, reject) => {
        genrePreferenceModal(id).then((genrePreference)=>{
            console.log("preference:", genrePreference.rows[0].genre_preferences);
            if (genrePreference.rows[0].genre_preferences === null) {
                movieRecommendFirstModal(id).then((results)=>{

                    console.log("results 1:", results.rows);
                    // resolve(results.rows);
                    const resultMap = new Map();
                    results.rows.forEach((movie) => {
                        if(resultMap.has(movie.id)) {
                            if(movie.rating > resultMap.get(movie.id).rating){
                                resultMap.set(movie.id, movie);
                            }
                        } else {
                            resultMap.set(movie.id, movie);
                        }
                    })

                    const resultSet = new Set(resultMap.values());
                    console.log("results 2:", resultSet);
                    const resultArray = Array.from(resultSet);
                    resolve(resultArray);
                    
                }).catch(error => {
                    console.error("Error fetching movie recommendations 1:", error);
                    reject("Internal server error in fetching movie recommendations 1");
                });
            } else {
                movieRecommendSecondModal(id,genrePreference.rows[0].genre_preferences).then((results)=>{

                    const resultMap = new Map();
                    results.rows.forEach((movie) => {
                        if(resultMap.has(movie.id)) {
                            if(movie.rating > resultMap.get(movie.id).rating){
                                resultMap.set(movie.id, movie);
                            }
                        } else {
                            resultMap.set(movie.id, movie);
                        }
                    })

                    const resultSet = new Set(resultMap.values());
                    console.log("results 2:", resultSet);
                    const resultArray = Array.from(resultSet);
                    if (resultArray.length < 5) {
                        movieRecommendFirstModal(id).then((moreResults) => {
                            
                            moreResults.rows.forEach((movie) => {
                                if (resultArray.length < 5 && !resultMap.has(movie.id)) {
                                    resultArray.push(movie);
                                }
                            });
                            console.log("final results:", resultArray);
                            resolve(resultArray);
                        }).catch(error => {
                            console.error("Error fetching additional movie recommendations:", error);
                            reject("Internal server error in fetching additional movie recommendations");
                        });
                    } else {
                        console.log("results 2:", resultArray);
                        resolve(resultArray);
                    }

                }).catch(error => {
                    console.error("Error fetching movie recommendations 2:", error);
                    reject("Internal server error in fetching movie recommendations 2");
                });
            }
        }).catch((error)=>{
            console.error("Error fetching user genre preference:", error);
            reject("Internal server error in fetching user genre preference");
        })
    })
}


