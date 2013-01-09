var express = require('express')
var nodemailer = require("nodemailer");

var app = express()
app.use(express.bodyParser());
var smtpTransport = nodemailer.createTransport("SMTP",{
	service: "Gmail",
	auth: {
		user:process.env.user,
		pass:process.env.pass
	}
});

var sendMail = function( to, callback) {
	smtpTransport.sendMail( {
		from: "Scenarium < testforscenarium@gmail.com >",
		to: to,
		subject: "Here's Your Copy of Scenarium",
		text: "Enjoy!",
		html:"<b>Enjoy!!!</b>"
	}, callback);
}

app.post('/submit', function(req,res){
	var email=(req.param('email',null));
	sendMail(email, function(err){
		if(err) res.send("error");
		else res.send("ok");
	});
});



app.use(express.static(__dirname + '/public'));

port = parseInt(process.env.PORT);

app.listen(port);