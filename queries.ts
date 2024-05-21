

export const userRegistrationQuery: string =`
    INSERT INTO users (username, genre_preferences) VALUES ($1, $2);
`;

export const movieRatingQuery: string =`
    INSERT INTO user_ratings (user_id, movie_id, rating) VALUES (
        (SELECT id FROM users WHERE username = $1),
        (SELECT id FROM movies WHERE title = $2),
        $3
    );
`;


export const getGenrePreferenceQuery: string=`
    SELECT genre_preferences FROM users WHERE id=$1;
`;

export const movieRecommendFirstQuery: string=`
    SELECT m.title, m.id, COALESCE(ur.rating, 0) AS rating
    FROM movies m
    LEFT JOIN user_ratings ur ON m.id = ur.movie_id AND ur.user_id <> $1
    WHERE NOT EXISTS (
        SELECT 1 FROM user_ratings ur2 WHERE ur2.movie_id = m.id AND ur2.user_id = $1
    )
    ORDER BY rating DESC
    LIMIT 5;
`;

export const movieRecommendSecondQuery: string=`
    SELECT m.title, m.id, COALESCE(ur.rating, 0) AS rating
    FROM movies m
    LEFT JOIN user_ratings ur ON m.id = ur.movie_id AND ur.user_id <> $1
    WHERE NOT EXISTS (
        SELECT 1 FROM user_ratings ur2 WHERE ur2.movie_id = m.id AND ur2.user_id = $1
    )
    AND m.genre = ANY($2)
    ORDER BY rating DESC
    LIMIT 5;
`;