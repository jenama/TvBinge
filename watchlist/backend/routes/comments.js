const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.get('/show/:show_id', async(req, res, next) => {
    const showId = req.params.show_id
    console.log('show id', showId)
    try {
        const commentQuery = `SELECT comments.id, comments.user_id, comment_body, show_id, username
                                FROM comments 
                                INNER JOIN shows ON comments.show_id = shows.id
                                INNER JOIN users ON comments.user_id = users.id
                                WHERE show_id = $1`
        const comments= await db.any(commentQuery, [showId])
        console.log('comments', comments)
        res.json({
            payload: comments,
            msg: `Retrieved all comments`,
            err: false
        })
    } catch (error) {
        res.status(500)
        res.json({
            msg: `Unable to retrieve the requested comments`
        })
        console.log('error', error)
    }
})

router.post('/', async(req, res) => {
      try {
        const insertQuery = `INSERT INTO comments (comment_body, user_id, show_id) 
                                VALUES ($1, $2, $3)`;
        
        await db.none(insertQuery, [req.body.comment_body, req.body.user_id, req.body.show_id])
        
        const newComment = {
            comment_body: req.body.comment_body,
            user_id: req.body.user_id,
            show_id: req.body.show_id
        }
        console.log('new comment', newComment)
        res.status(201)
        res.json({
            payload: newComment,
            msg: `The comment was added`,
        })

    } catch (err) {
        console.log('error', err)
        res.status(500)
        res.json({
            msg: `Failure to add a comment`,
        })
    }
})


module.exports = router;