const Koa = require('koa');
const koaLogger = require('koa-logger');
const logger = require('./logger.js');
const app = new Koa();

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
app.use(async(ctx, next) => {
    logger.debug(`The request url is ${ctx.url}`);
    ctx.body = {
        ok: 1
    };
});
app.listen(3000, function(err) {
    if (err) {
        logger.error('Error listening in port 3000', err);
        process.exit(1);
    }
    logger.info('Koa server listening in port 3000');
});