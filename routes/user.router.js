const logger = require('../logger.js');
const Router = require('koa-router');
const UserValidator = require("../validators/user.validator.js");
const UserModel = require("../models/user.model.js");
let users = [];
let nextId = 0;
/* claise userRouter */
class userRouter {
    /* metodos */
    static async get(ctx) {
        logger.info('Obtaining all user');
        ctx.body = await UserModel.find();
    }

    static async getById(ctx) {
        logger.info(`Obtaining user with id ${ctx.params.id}`);
        const user = await UserModel.findById(ctx.params.id);
        if (!user) {
            ctx.throw(404, 'fond1');
            return;
        }
        ctx.body = user;
    }
    static async create(ctx) {
        logger.info(`Creating new user with body ${ctx.request.body}`);
        ctx.body = await new UserModel(ctx.request.body).save();
    }
    static async update(ctx) {
        logger.info(`Updating user with id ${ctx.params.id}`);
        let user = await UserModel.getById(ctx.params.id);
        if (!user) {
            ctx.throw(404, 'user not found');
            return;
        }
        user = Object.assign(user, ctx.request.body);
        ctx.body = await user.save();
    }
    static async delete(ctx) {
        logger.info(`Deleting user with id ${ctx.params.id}`);
        const numDeleted = await UserModel.delete({
            _id: mongoose.Types.ObjectId(ctx.params.id)
        });
        logger.debug('Elementos eliminados', numDeleted);
        if (numDeleted.result.ok <= 0) {
            ctx.throw(404, 'user not found');
            return;
        }
        ctx.body = numDeleted.result;;
    }
};
/* Creamos un nuevo router y le ponemos como prefijo ‘/fim’ que es la parte común en todas
 * nuestros endpoints(el padre). */
const router = new Router({
    prefix: '/hijo'
});
/* definimos en nuestro objeto router en todos nuestros endpoints y llamamos a los metod0s
 * segun la peticion */
router.get('/getAll', userRouter.get);
router.get('/getById/:id', UserValidator.validateId, userRouter.getById);
router.post('/post/', UserValidator.validateCreate, userRouter.create);
router.put('/put/:id', UserValidator.validateId, userRouter.update);
router.delete('/delete/:id', UserValidator.validateId, userRouter.delete);

module.exports = router;