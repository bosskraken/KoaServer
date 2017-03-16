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
/* archivos importados */
const logger = require('./logger.js');
const userRouter = require("./routes/user.router.js");

const htmlRouter = require("./routes/html.router.js");

const app = new Koa();
app.use(body());
app.use(userRouter.routes());
app.use(mount('/api/v1', userRouter.routes()));
validate(app);
/* sesion */
if (process.env.NODE_ENV === 'dev') {
    app.use(koaLogger());
}
/* definos la clave de la sesion */
app.keys = ['SAN'];
/* registramos el middleware de session */
app.use(convert(session({
    store: new File({
        sessionDirectory: '/sessions'
    })
})));

app.use(async(ctx, next) => {
    logger.info(`Last request was ${ctx.session.lastRequest}`);
    ctx.session.lastRequest = new Date();
    await next();
});
/* fin sesion */
/* render */
/*app.use(views(__dirname + '/views', {
    map: {
        ejs: 'ejs'
    }
}));

app.use(htmlRouter.routes());
/* fin render */
if (process.env.NODE_ENV === 'dev') {
    app.use(koaLogger());
}
app.use(async(ctx, next) => {
    const start = Date.now();
    await next();
    const time = Date.now() - start;
    //set the header
    ctx.set('X-Response-Time', `${time} ms`);
});
app.listen(3000, function(err) {
    if (err) {
        logger.error('Error listening in port 3000', err);
        process.exit(1);
    }
    logger.info('Koa server listening in port 3000');
});