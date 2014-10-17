express = require 'express'
app = express();
bodyParser = require 'body-parser'

app.use bodyParser()

app.post '/hook', (req,res) ->
	res.send 200,'{"message":"ok","result":"ok"}'
	if not req.body.ref == "refs/heads/master"
		return
    request.checkMigration req, (save) ->
        if save
            db.
    


app.listen process.env.PORT || 3000
