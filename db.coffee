levelup = require 'level'

db = levelup './db'

module.exports = (req,res,next) ->
	req._db = db
	next()

