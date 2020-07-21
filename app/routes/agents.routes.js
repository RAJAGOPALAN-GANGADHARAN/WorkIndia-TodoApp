const passport = require("../config/passport/passport.js");

module.exports = (app,passport) => {
    const agent = require("../controllers/agents.controller.js");

    var router = require("express").Router();
    router.get('/app/agent', agent.create);
    router.post("/app/agent", passport.authenticate('local-signup', {
        successRedirect: '/app/agent/success',
        failureRedirect: '/signup'
    }));

    router.post('/app/agent/auth', passport.authenticate('local-signin', {
        successRedirect: '/app/agent/dashboard',
        failureRedirect: '/app/agent/failure'
    }));

    router.get('/app/agent/failure', (req, res) => {
        res.status(401).send({
            "status": "failure"
        });
    })
    router.get('/app/agent/dashboard', isLoggedIn, agent.dashboard);
    router.get('/app/agent/success', agent.success);
    // Retrieve all agent
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/app/agent/auth');
    }
    router.get('/sites/list', isLoggedIn, agent.getTodo);
    router.post('/sites/list', isLoggedIn, agent.AddTodo);
    app.use('/', router);
};