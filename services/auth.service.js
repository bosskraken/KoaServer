const passport = require('koa-passport');
const BasicStrategy = require('passport-http').BasicStrategy;


async function registerUserBasic(username, password, done) {
    if (username === 'admin' && password === 'admin') {
        done(null, {
            _id: 'basic',
            provider: 'basic',
            username: 'admin'
        });
    } else {
        done(null, false);
    };



    passport.serializeUser(async(user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async(id, done) => {
        let user = null;
        if (id === 'basic') {
            user = {
                _id: 'basic',
                provider: 'basic',
                username: 'admin'
            };
        }
        done(null, user);
    });

};

// registramos la estrategia
passport.use(new BasicStrategy(registerUserBasic));