let express = require('express');
let app = express();

let fortune = require('./lib/fortune')
// handlebars view engine
let handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// set port
app.set('port', process.env.PORT || 3000);

// static middleware
app.use(express.static(__dirname + '/public'));




// homepage
app.get('/', (req, res) => {
    res.render('home');
})

// about page
app.get('/about', (req, res) => {
    res.render('about', {fortune: fortune.getFortunes()});
})

// 404 page
app.use(function (req, res) {
    res.status(404);
    res.render('404');
})

// 500 page
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
})

app.listen(app.get('port'), function () {
    console.log("success");
})
