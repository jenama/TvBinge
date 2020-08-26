const express = require('express');
const router = express.Router();
const db = require('../db/db');

/* GET all users listing. */
router.get('/', async(req, res, next) => {
  try {
    const requestQuery = `SELECT * FROM users`
    const users = await db.any(requestQuery)
    res.status(200)
    res.json({
      payload: users,
      msg: `The request was successful`
    })
  } catch (error) {
    console.log('error', error)
    res.status(500)
    res.json({
      msg: `Something went wrong`
    })
  }
});

router.get('/:id', async(req, res, next) => {
  const id = req.params.id
  // console.log('ID=', id)
  try {
    const requestQuery = `SELECT * FROM users WHERE id = $1`
    const user = await db.oneOrNone(requestQuery, id)
    // console.log('user', user)
    res.status(200)
    res.json({
      payload: user,
      msg: `Successful request`
    })
  } catch (error) {
    res.status(500)
    console.log('ERROR', error)
    res.json({
      msg: `Request was unsuccessful`
    })
  }
})

router.post('/', async(req, res, next) => {
  try {

    const insertQuery = `INSERT INTO users(avatar_url, username)
                          VALUES($1, $2)`
    await db.none(insertQuery, [req.body.avatar_url, req.body.username])
    let userData = {
      avatar_url: req.body.avatar_url,
      username: req.body.username
    }
    res.status(201)
    res.json({
      payload: userData,
      msg:`The user has been inserted`
    })
  } catch (error) {
    console.log('error', error)
    res.status(500)
    res.json({
      msg:`Something is missing`
    })
  }
})

module.exports = router;
