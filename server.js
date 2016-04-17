// server.js

// modules =================================================

var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var WindowsStrategy = require('passport-windowsauth');
var passport = require('passport');
// configuration ===========================================
    
    
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user); 
    console.log(user);   
});

passport.deserializeUser(function(user, done) {
    done(null, user);
    console.log(user);
});

passport.use(new WindowsStrategy({
    integrated: true 
}, function(profile,done) {
    var user = {
        id: profile.id,
    };
    console.log(user);
    done(null, user);
}));

app.all("*", passport.authenticate("WindowsAuthentication"), function (request,response,next){
    console.log(request);
    next();
});


// config files
var db = {
        url : 'mongodb://localhost/ipl'
    }   ;
// set our port
var port = process.env.PORT || 8000; 

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
 mongoose.connect(db.url); 

// get all data/stuff of the body (POST) parameters
// parse application/json 
//app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/app'));

// Express

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

// routes ==================================================
app.use('/api', require('./backend/api'));
require('./backend/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;   



// references http://stackoverflow.com/questions/16040067/nodejs-or-expressjs-windows-authentication
