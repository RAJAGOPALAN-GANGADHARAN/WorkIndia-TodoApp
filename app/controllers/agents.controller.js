const db = require("../models");
const todo = db.todo;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    res.render('signup',{layout:false});
    
};

exports.authenticate = (req, res) => {
    
};

exports.signup = (req, res) => {
    // console.log(req);
    // res.send("OK");
};

exports.dashboard = (req, res) => {
    //res.render("dashboard", { layout: false });
    console.log(req);
    res.status(200).send({
        "status": "success",
        "agent_id": req.user.id,
        "status_code":200
    })
}

exports.getTodo = (req, res) => {
    let id = req.query.id;
    let aid = req.user.id;
    if (aid != id)
        res.status(401).send("Empty");
    else {
        todo.findAll({ where: { agent_id: aid } }).then(data => {
            res.send(data);
        })
    }
}

exports.AddTodo = (req, res) => {
    let id = req.query.id;
    let aid = req.user.id;
    if (aid != id)
        res.status(401).send("Empty");
    else {
        const temp = {
            agent_id: aid,
            title: req.body.title,
            description: req.body.description,
            due_date:req.body.due_date,
            category:req.body.category
        }
        todo.create(temp).then(data => {
            res.status(200).send({ "status": "Success" });
        })
    }
}

exports.success = (req, res) => {
    res.status(200).send({ 'status': 'account_created' });
}