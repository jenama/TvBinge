const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.get('/', async(req, res, next) => {
    try {
      const requestQuery = `SELECT * FROM genres` 
      const genres = await db.any(requestQuery) 
      res.status(200)
      res.json({
          payload: genres,
          msg: `All genres was retrieved`
      })
    } catch (error) {
        console.log('error', error)
        res.status(500)
        res.json({
            msg: `Request failed`
        })
    }
})

router.post('/', async(req, res, next) => {
    try {
        const insertQuery = `INSERT INTO genres(genre_name)
                                VALUES($1)`
        await db.none(insertQuery, [req.body.genre_name])
        res.status(201)
        res.json({
            payload: req.body.genre_name,
            msg:`Successfully retrieved genres`
        })
    } catch (error) {
       res.status(500) 
       res.json({
           msg: `Failed request`
       })
       console.log('error', error)
    }
})
module.exports = router;