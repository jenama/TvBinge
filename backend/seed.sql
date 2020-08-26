DROP DATABASE if exists tvwatchlistapp;
CREATE DATABASE tvwatchlistapp;

\c tvwatchlistapp

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    avatar_url VARCHAR NOT NULL
);

CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    genre_name VARCHAR NOT NULL
);

CREATE TABLE shows (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    img_url VARCHAR NOT NULL,
    -- user_id INT REFERENCES users(id),
    genre_id INT REFERENCES genres(id)
);

CREATE TABLE shows_users (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    show_id INT REFERENCES shows(id)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment_body VARCHAR NOT NULL,
    user_id INT REFERENCES users(id),
    show_id INT REFERENCES shows(id)
);

-- INSERT GENRES
INSERT INTO genres (genre_name) 
    VALUES ('Adventure'),
            ('Drama'), 
            ('Comedy'), 
            ('Fantasy');

-- INSERT USERS
INSERT INTO users (username, avatar_url) 
    VALUES 
        ('Jon Snow', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kit-harington-hair-jon-snow-1569167827.jpg?crop=0.439xw:0.878xh;0.0221xw,0.0306xh&resize=480:*'), 
        ('Daenerys Targaryen', 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/36/1504608500-daenerys.jpg?crop=0.665xw:1.00xh;0.0950xw,0&resize=480:*'),
        ('Michael Scott', 'https://i1.sndcdn.com/avatars-000162505694-i81i0k-t500x500.jpg'),
        ('Pam Beesly', 'https://i1.sndcdn.com/avatars-000150274248-xnvnyn-t500x500.jpg');

-- INSERT SHOWS
INSERT INTO shows (title, img_url, genre_id)
    VALUES 
        ('Game of Thrones', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg', 4),
        ('The Flash', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/jC1KqsFx8ZyqJyQa2Ohi7xgL7XC.jpg', 1),
        ('Naruto Shippūden', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/zAYRe2bJxpWTVrwwmBc00VFkAf4.jpg', 4),
        ('Greys Anatomy', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/eqgIOObafPJitt8JNh1LuO2fvqu.jpg', 2),
        ('The Simpsons', 'https://image.tmdb.org/t/p/w1280/qcr9bBY6MVeLzriKCmJOv1562uY.jpg', 3);


-- INSERT SHOW_USERS relationships
INSERT INTO shows_users(show_id, user_id)
    VALUES
        (1, 1), -- Jon Snow is watching Game of Thrones
        (1, 2),
        (1, 3),
        (2, 1),
        (2, 3),
        (2, 4),
        (3, 1),
        (3, 2),
        (4, 3),
        (4, 4),
        (5, 1),
        (5, 4);

-- INSERT COMMENTS
INSERT INTO comments (comment_body, user_id, show_id)
    VALUES ('BEST SHOW EVER!!', 1, 1), 
            ('Of course you would think so Jon', 2, 1);





