const logger = require('../logger.js');
const Router = require('koa-router');
let films = [];
let nextId = 0;
/* claise FilmRouter */
class FilmRouter {
    /* metodos */
    static async get(ctx) {
        logger.info('Obtaining all films');
        ctx.body = films;
    }

    static async getById(ctx) {
        logger.info(`Obtaining film with id ${ctx.params.id}`);
        const film = films.find((f) => f.id === +ctx.params.id);
        if (!film) {
            ctx.throw(404, 'Film not found');
            return;
        }
        ctx.body = film;
    }
    static async create(ctx) {
        logger.info(`Creating new film with body ${ctx.request.body}`);
        const film = ctx.request.body;
        film.id = nextId++;
        films.push(film);
        ctx.body = film;
    }
    static async update(ctx) {
        logger.info(`Updating film with id ${ctx.params.id}`);
        let film = null;
        films = films.map((f) => {
            if (f.id === +ctx.params.id) {
                film = Object.assign(f, ctx.request.body);
                return film;
            }
            return f;
        });
        if (!film) {
            ctx.throw(404, 'Film not found');
            return;
        }
        ctx.body = film;
    }
    static async delete(ctx) {
        logger.info(`Deleting film with id ${ctx.params.id}`);
        const before = films.length;
        films = films.filter((f) => f.id !== +ctx.params.id);
        if (films.length >= before) {
            ctx.throw(404, 'Film not found');
            return;
        }
        ctx.body = null;
    }
};
/* Creamos un nuevo router y le ponemos como prefijo ‘/fim’ que es la parte común en todas
 * nuestros endpoints(el padre). */
const router = new Router({
    prefix: '/film'
});
/* definimos en nuestro objeto router todos nuestros endpoints */
router.get('/', FilmRouter.get);
router.get('/:id', FilmRouter.getById);
router.post('/', FilmRouter.create);
router.put('/:id', FilmRouter.update);
router.delete('/:id', FilmRouter.delete);

module.exports = router;