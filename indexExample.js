const onDBReady = (err) => {
    if (err) {
        logger.error('Error connecting', err);
        throw new Error('Error connecting', err);
    }
    const app = new Koa();
    if (process.env.NODE_ENV === 'dev') {
        app.use(koaLogger());
    }
    app.keys = ['claveSuperSecreta'];
    app.use(convert(session({
        store: new File({
            sessionDirectory: __dirname + '/sessions'
        })
    })))
};