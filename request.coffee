request = require 'request'

newOrReset = (req,res) ->
	request req.body.commits_url, (err,data) ->
		data = JSON.parse data
		request data.parents[0].url, (err,data) ->
			data = JSON.parse data
			files = data.files
			migrate = false
			for file in files
				paths = file.split '/'
				for folder in paths
					if folder == 'migrations'
						migrate = true
			if migrate
				req._db.put 'pr-'+req.body.id, 0, (err) ->
					if err
						console.err 'levelup-error: '+err

checkForApprove = (req,res) ->
	id = req.body.pull_request.id
	username = req.body.comment.user.login
	req._db.get 'pr-'+id, (err,value) ->
		if err
			return
		request req.body.pull_request.head.repo.contributors_url, (err,data) ->
			data = JSON.parse data
			for user in data
				if user.login == username
					req._db.put 'pr-'+req.body.id, value++
					return
