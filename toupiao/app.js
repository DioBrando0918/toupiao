var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var countRouter = require('./routes/admin/count');
var flowpathRouter = require('./routes/admin/flowpath');
var personRouter = require('./routes/admin/person');
var userRouter = require('./routes/admin/users');
var voteRouter = require('./routes/admin/vote');
var uploadRouter = require('./routes/utils/upload')
var getConnect = require('./db/connect');
var session = require('express-session')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //设置应用程序的配置项,'views' 是要设置的配置项的名称，表示 Express 应用程序的视图文件所在的目录。path.join(__dirname, 'views') 是一个路径，用于指定视图文件所在的目录。
app.set('view engine', 'ejs');//'view engine' 是要设置的配置项的名称，表示 Express 应用程序所使用的视图引擎。'ejs' 是要设置的视图引擎的名称，表示要使用 EJS 视图引擎。

app.use(logger('dev'));//这行代码是在 Express 应用程序中使用 Morgan 中间件来记录日志
//这行代码是在 Express 应用程序中使用内置的 JSON 解析中间件。这个中间件用于解析传入的请求主体（request body），
// 如果请求的 Content-Type 是 application/json，它会自动将 JSON 格式的请求主体解析成 JavaScript 对象，并将解析后的对象附加到 req.body 上，供后续的路由处理函数使用。
app.use(express.json());
//这行代码是在 Express 应用程序中使用内置的 URL 编码解析中间件。这个中间件用于解析传入的请求主体（request body），如果请求的 Content-Type 是 application/x-www-form-urlencoded，
// 它会自动将 URL 编码的请求主体解析成 JavaScript 对象，并将解析后的对象附加到 req.body 上，供后续的路由处理函数使用。
app.use(express.urlencoded({extended: false}));
//这行代码是在 Express 应用程序中使用 cookie 解析中间件。这个中间件用于解析传入的请求头中的 cookie，并将解析后的 cookie 对象附加到 req.cookies 上
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:'recommand 128 bytes radom string',
    cookie:{maxAge:20 * 60 * 1000},
    resave:true,
    saveUninitialized:true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/count', countRouter);
app.use('/admin/flowpath', flowpathRouter);
app.use('/admin/person', personRouter);
app.use('/admin/user', userRouter);
app.use('/admin/vote', voteRouter);
app.use('/upload',uploadRouter);

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

getConnect();
