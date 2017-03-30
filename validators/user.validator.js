class UserValidator {
    static async validateCreate(ctx, next) {
        /* estas son las reglas de los parametros que tenemos body de request */
        ctx.checkBody('name').notEmpty().len(2, 5);
        ctx.checkBody('year').isInt().toInt();
        ctx.checkBody('gender').notEmpty().in(['macho cabrio', 'peter parker', 'loca del', 'wonder woman']);
        if (ctx.errors && ctx.errors.length > 0) {
            ctx.status = 400;
            ctx.body = ctx.errors;
            return;
        }
        await next();
    }
    static async validateId(ctx, next) {
        ctx.checkParams('id').isHexadecimal().isLength(24);
        if (ctx.errors && ctx.errors.length > 0) {
            ctx.status = 400;
            ctx.body = ctx.errors;
            return;
        }
        await next();
    }
}
module.exports = UserValidator;