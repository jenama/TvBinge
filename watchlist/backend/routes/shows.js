const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.get('/', async(req, res, next) => {
    try {
      const requestQuery = `SELECT shows.id, title, img_url, genre_name, 
                            ARRAY_AGG(users.username) AS username, ARRAY_AGG(users.id) AS user_id
                                FROM shows 
                                FULL OUTER JOIN shows_users ON shows.id = shows_users.show_id
                                FULL OUTER JOIN genres ON genres.id = shows.genre_id
                                FULL OUTER JOIN users ON users.id = shows_users.user_id
                                GROUP BY shows.id, shows.title, shows.img_url, genres.genre_name`
      const shows = await db.any(requestQuery)
      console.log('shows', shows)
      res.status(200) 
      res.json({
            payload: shows,
            msg: `Successfully retrieved shows`
      }) 
    } catch (error) {
        res.status(500)
        res.json({
            msg: `Failed request`
        })
       console.log('error', error) 
    }
})

router.get('/:id', async(req, res, next) => {
    let id = req.params.id
    try {
      const requestQuery = `SELECT shows.id, title, img_url, genre_id, genre_name FROM shows INNER JOIN genres ON shows.genre_id = genres.id WHERE shows.id = $1` 
      const showsById = await db.one(requestQuery, id)
      console.log('shows by id', showsById)
      res.status(200)
      res.json({
          payload: showsById,
          msg: `The request has been granted`
      })
    } catch (error) {
      console.log('error', error)
      res.status(500)
      res.json({
          msg: `The request was not granted`
      })  
    }
})

router.get('/genre/:genre_id', async(req, res, next) => {
    try {
       let genreId = req.params.genre_id
       console.log('genre id', genreId)
      const requestQuery = `SELECT shows.id, title, img_url, genre_id FROM shows INNER JOIN genres ON shows.genre_id = genres.id WHERE genre_id = $1` 
      const showsByGenre = await db.any(requestQuery, genreId)
      console.log('shows by id', showsByGenre)
      res.status(200)
      res.json({
          payload: showsByGenre,
          msg: `The request has been successful`
      }) 
    } catch (error) {
       console.log('error', error)
      res.status(500)
      res.json({
          msg: `The request failed`
      }) 
    }
})

router.get('/user/:user_id', async(req, res, next) => {
    try {
       let userId = req.params.user_id
       console.log('user id', userId)
      const requestQuery = `SELECT genre_name, title, img_url, username, avatar_url, shows.id, COUNT(comment_body)
                                    FROM shows 
                                    FULL OUTER JOIN shows_users ON shows.id = shows_users.show_id
                                    FULL OUTER JOIN users ON shows_users.user_id = users.id 
                                    FULL OUTER JOIN genres ON genres.id = shows.genre_id
                                    FULL OUTER JOIN comments ON shows.id = comments.show_id
                                    WHERE shows_users.user_id = $1
                                    GROUP BY shows.title, shows.img_url, genre_name, users.username, users.avatar_url, shows.id` 
      const showsByUser = await db.any(requestQuery, userId)
      console.log('shows by id', showsByUser)
      res.status(200)
      res.json({
          payload: showsByUser,
          msg: `All the shows associated with the user has been retrieved`
      }) 
    } catch (error) {
       console.log('error', error)
      res.status(500)
      res.json({
          msg: `The shows by all user request has failed`
      }) 
    }
})

router.post('/', async(req, res, next) => {
    
    try {
      const insertQuery = `INSERT INTO shows (title, img_url, genre_id) 
                                VALUES ($1, $2, $3)`;
                            `INSERT INTO shows-users (user_id)
                                VALUES ($1)`;
       

        await db.none(insertQuery, [req.body.title, req.body.img_url, req.body.genre_id, req.body.user_id])
        const newShow = {
             title: req.body.title,
            img_url: req.body.img_url,
            genre_id: req.body.genre_id,
            user_id: req.body.user_id
        }
        
        console.log('new show', newShow) 
        res.status(201)
        res.json({
            payload: newShow,
            msg: `A new show has been successfully added`
        })
    } catch (error) {
        res.status(500)
        res.json({
            msg: `Failed to add a new show`
        })
        console.log('error', error)
    }
      
})

module.exports = router;