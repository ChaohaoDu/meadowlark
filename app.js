let express = require('express');
let app = express();

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
let fortuneCookies = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];

app.get('/about', (req, res) => {
    let randomFortune = fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)];
    console.log(randomFortune);
    res.render('about', {fortune: randomFortune});
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
