const bunyan = require('bunyan');

const logger = bunyan.createLogger({
    name: 'my-app',
    level: 'debug'
});
module.exports = logger;