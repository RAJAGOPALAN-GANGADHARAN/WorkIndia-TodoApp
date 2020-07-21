module.exports = (sequelize, Sequelize) => {
    const Agent = sequelize.define("agent", {
        agent_id: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Agent;
};