var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var nav = [{
    link: '/Books',
    text: 'Books'
}, {
    link: '/Authors',
    text: 'Authors'
}];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);
//var authorRouter = require('./src/routes/authorRoutes')(nav);

var port = process.env.PORT || 5000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);
//app.use('/Authors', authorRouter);

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

app.listen(port, function (err) {
    console.log('Server started on port: ' + port);
});