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
		text: "Thank you good gamer, for downloading the beta print-at-home version of Scenarium.\n\nScenarium is a party game that combines the best elements of charades, draw something, and apples-to-apples.\n\nIt's a chance for 3-10 people to compete for creative supremacy as they make things up on the fly, inspired by creative commons photos, and a few unusual prompts.\n\nDownload the cards below, with backs or without (the version with backs is larger and more toner-intensive), and let me know how you like it. With your help, we're going to build both a card-based version and a mobile app version that would let you play anywhere.\n\nIf you have any questions or comments or stories of spectacular performances by you or your friends, let me know at pierce@robotdinosaurgames.com.\n\nUntil then, enjoy your game.\n\nhttp://scenarium.herokuapp.com/ScenariumNoBacks.pdf\n\nhttp://scenarium.herokuapp.com/ScenariumWithBacks.pdf",
		html:"<p>Thank you good gamer, for downloading the beta print-at-home version of Scenarium.</p><p>Scenarium is a party game that combines the best elements of charades, draw something, and apples-to-apples.</p><p>It's a chance for 3-10 people to compete for creative supremacy as they make things up on the fly, inspired by creative commons photos, and a few unusual prompts.</p><p>Download the cards below, with backs or without (the version with backs is larger and more toner-intensive), and let me know how you like it. With your help, we're going to build both a card-based version and a mobile app version that would let you play anywhere.</p><p>If you have any questions or comments or stories of spectacular performances by you or your friends, let me know at pierce@robotdinosaurgames.com.</p><p>Until then, enjoy your game.</p><p><a href='http://scenarium.herokuapp.com/ScenariumNoBacks.pdf'>Scenarium without Backs</a></p><p><a href='http://scenarium.herokuapp.com/ScenariumWithBacks.pdf'>Scenarium With Backs</a></p>"
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