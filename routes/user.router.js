const logger = require('../logger.js');
const Router = require('koa-router');
const UserValidator = require("../validators/user.validator.js");
let users = [];
let nextId = 0;
/* claise userRouter */
class userRouter {
    /* metodos */
    static async get(ctx) {
        logger.info('Obtaining all users');
        ctx.body = users;
    }

    static async getById(ctx) {
        logger.info(`Obtaining user with id ${ctx.params.id}`);
        const user = users.find((f) => f.id === +ctx.params.id);
        if (!user) {
            ctx.throw(404, 'user not found');
            return;
        }
        ctx.body = user;
    }
    static async create(ctx) {
        logger.info(`Creating new user with body ${ctx.request.body}`);
        const user = ctx.request.body;
        user.id = nextId++;
        users.push(user);
        ctx.body = user;
    }
    static async update(ctx) {
        logger.info(`Updating user with id ${ctx.params.id}`);
        let user = null;
        users = users.map((f) => {
            if (f.id === +ctx.params.id) {
                user = Object.assign(f, ctx.request.body);
                return user;
            }
            return f;
        });
        if (!user) {
            ctx.throw(404, 'user not found');
            return;
        }
        ctx.body = user;
    }
    static async delete(ctx) {
        logger.info(`Deleting user with id ${ctx.params.id}`);
        const before = users.length;
        users = users.filter((f) => f.id !== +ctx.params.id);
        if (users.length >= before) {
            ctx.throw(404, 'user not found');
            return;
        }
        ctx.body = null;
    }
};
/* Creamos un nuevo router y le ponemos como prefijo ‘/fim’ que es la parte común en todas
 * nuestros endpoints(el padre). */
const router = new Router({
    prefix: '/user'
});
/* definimos en nuestro objeto router en todos nuestros endpoints y llamamos a los metod0s
 * segun la peticion */
router.get('/', userRouter.get);
router.get('/:id', UserValidator.validateId, userRouter.getById);
router.post('/', UserValidator.validateCreate, userRouter.create);
router.put('/:id', UserValidator.validateId, userRouter.update);
router.delete('/:id', UserValidator.validateId, userRouter.delete);

module.exports = router;