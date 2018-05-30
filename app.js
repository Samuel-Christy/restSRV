var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//parseur de requête HTTP, pour analyser ce qui nous arrive et lire le JSON qui est contenu.
var bodyParser = require('body-parser');

//inclusion des Cross Origin Ressources, pour éviter les erreur AJAX côté navigateur/client :
var cors = require('cors');

//fichiers de route "express" déjà pérsents
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//inclure notre routeur Todos :
var Todos = require('./routes/TodoRoutes');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//fichiers de route "express" déjà pérsents
app.use('/', indexRouter);
app.use('/users', usersRouter);

//redirige tout ce qui arrive sur http://monserveur/Todos vers notre fichier de routes (routes/TodoRoutes.js)
app.use('/Todos', Todos);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
