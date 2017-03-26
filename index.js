/* librerias del core */
const Koa = require('koa');
const body = require('koa-body');
const koaLogger = require('koa-logger');
const mount = require('koa-mount');
const validate = require('koa-validate');
const views = require('koa-views');
const convert = require('koa-convert');
const session = require('koa-generic-session');
const File = require('koa-generic-session-file');
const mongoose = require('mongoose');
//Url de conexion: 
const mongoUri = 'mongodb://localhost:27017/users'
    /* archivos importados */
const logger = require('./logger.js');
const userRouter = require("./routes/user.router.js");

const htmlRouter = require("./routes/html.router.js");

const onDBReady = (err) => {
    if (err) {
        logger.error('Error connecting', err);
        throw new Error('Error connecting', err);
    }
    const app = new Koa();
    if (process.env.NODE_ENV === 'dev') {
        app.use(koaLogger());
    }
    app.keys = ['bille123'];

    app.use(convert(session({
        store: new File({
            sessionDirectory: __dirname + '/sessions'
        })
    })));
    app.use(async(ctx, next) => {
        logger.info(`Last request was ${ctx.session.lastRequest}`);
        ctx.session.lastRequest = new Date();
        await next();
    });
    app.use(body());
    app.use(async(ctx, next) => {
        const start = Date.now();
        await next();
        const time = Date.now() - start;
        ctx.set('X-Response-Time', `${time} ms`);
    });
    validate(app);
    app.use(views(__dirname + '/views', {
        map: {
            ejs: 'ejs'
        }
    }));
    app.use(mount('/users', userRouter.routes()));
    app.use(htmlRouter.routes());
    app.listen(3000, function(err) {
        if (err) {
            logger.error('Se ha encontrado un error en el listener', err);
            proccess.exit(1);
        }
        logger.info('Server is listeninini in port 3000');

    });
}
mongoose.connect(mongoUri, onDBReady);