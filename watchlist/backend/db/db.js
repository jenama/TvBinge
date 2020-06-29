const pgp = require('pg-promise')();
const cn = "postgres://localhost:5432/tvwatchlistapp";
const db = pgp(cn)//database instance that represents database
module.exports = db