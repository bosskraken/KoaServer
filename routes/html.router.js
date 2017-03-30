const logger = require('../logger.js');
const Router = require('koa-router');

class HtmlRouter {

    static async home(ctx) {

        ctx.body = {
            ctx: 'json'
        }
        var this_ctx = ctx.body.name;
        await ctx.render('index.ejs', this_ctx);
    }
}
const router = new Router({});

router.get('/', HtmlRouter.home);

module.exports = router;