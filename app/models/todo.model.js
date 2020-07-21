module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("Todo", {
        agent_id: {
            type: Sequelize.INTEGER,
            allowNull:false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type:Sequelize.STRING
        },
        due_date: {
            type: Sequelize.DATE
        },
        Category: {
            type:Sequelize.STRING
        }
    });

    return Todo;
};