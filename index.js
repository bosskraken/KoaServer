const Koa = require('koa');
const body = require('koa-body');
const koaLogger = require('koa-logger');
const mount = require('koa-mount');
const logger = require('./logger.js');
const filmRouter = require("./routes/film.router.js");

const app = new Koa();
app.use(body());
app.use(filmRouter.routes());
app.use(mount('/api/v1', filmRouter.routes()));

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