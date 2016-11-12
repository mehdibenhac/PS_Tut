// Imports
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var nav = [{
    link: '/Books',
    text: 'Books'
}, {
    link: '/Authors',
    text: 'Authors'
}];

// Routes
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);


// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'library'
}));
require('./src/config/passport.js')(app);

// Templating Engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Routing
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from ...',
        nav: [{
            link: '/Books',
            text: 'Books'
        }, {
            link: '/Authors',
            text: 'Authors'
        }]
    });
});

// Port listening
var port = process.env.PORT || 5000;

app.listen(port, function (err) {
    console.log('Server started on port: ' + port);
});