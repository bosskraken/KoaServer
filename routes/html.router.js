const logger = require('../logger.js');
const Router = require('koa-router');

class HtmlRouter {
    static async home(ctx) {
        await ctx.render('index.ejs');
    }
}
const router = new Router({});

router.get('/', HtmlRouter.home);

module.exports = router;