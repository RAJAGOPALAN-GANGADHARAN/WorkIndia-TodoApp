var bCrypt = require('bcrypt-nodejs');


module.exports = function (passport, user) {


    var User = user;

    var LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });


    passport.deserializeUser(function (id, done) {
        User.findByPk(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use('local-signup', new LocalStrategy(
    {
        usernameField: 'agent_id',
        passwordField: 'password',
        passReqToCallback: true
        },
        
    function (req, agent_id, password, done) {

        var generateHash = function (password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        User.findOne({
            where: {
                agent_id: agent_id
            }
        }).then(function (user) {
            if (user) {
                return done(null, false, {
                    message: 'That name is already taken'
                });
            } else {
                var userPassword = generateHash(password);
                var data =
                {
                    agent_id: agent_id,
                    password: userPassword
                };

                User.create(data).then(function (newUser, created) {
                    if (!newUser) {
                        return done(null, false);
                    }
                    if (newUser) {
                        return done(null, newUser);
                    }
                });
            }
            });

        }

    ));

    passport.use('local-signin', new LocalStrategy(
    {
        usernameField: 'agent_id',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        var User = user;
        var isValidPassword = function (userpass, password) {
            return bCrypt.compareSync(password, userpass);
        }
        User.findOne({
            where: {
                agent_id: email
            }
        }).then(function (user) {
            if (!user) {
                return done(null, false, {
                    message: 'Agent doesnt does not exist'
                });
            }
            if (!isValidPassword(user.password, password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            var userinfo = user.get();
            return done(null, userinfo);
        }).catch(function (err) {
            console.log("Error:", err);
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
        });
    }
    ));

}

