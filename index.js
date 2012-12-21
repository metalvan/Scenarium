express = require('express')
var app = express()


app.get('/emailsubmit', function(req,res){
	res.send('hello world');
});



app.use(express.static(__dirname + '/public'));

port = parseInt(process.env.PORT);

app.listen(port);