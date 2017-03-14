/* librerias importadas y declaracion de las mismas */
const Koa = require('koa');
const koaLogger = require('koa-logger');
const logger = require('logger');


const app = new Koa();



/* funcion que manda un json */
app.use(async(ctx, next) => {
    console.log(`The request url is ${ctx.url}`);
    ctx.body = {
        json: 'json'
    };
});
/* funcion que muiestra los minisegundos que tarda en respònder el server */
app.use(async(ctx, next) => {
    const start = Date.now();
    await next();
    const time = Date.now() - start;
    //set the header
    ctx.set('X-Response-Time', `${time} ms`);
});

/* funcion que levanta el server nodeJs */
app.listen(3000, function(err) {
    if (err) {
        console.error('Error listening in port 3000', err);
        process.exit(1);
    }
    console.log('Koa server listening in port 3000');
});
/* uso de libreria koa-loger-->muestra por consola
 * información sobre la request */
if (process.env.NODE_ENV === 'dev') {
    app.use(koaLogger());
}

/* funcionque manda un texto */
/*
app.use(async(ctx, next) => {
    console.log(`The request url is ${ctx.url}`);
    ctx.body = 'My first middleware';
});
*/