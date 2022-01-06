const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fullstack', 'root', '1234567', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('CONNECT SEQUELIZE IS SUCCESSFUL');
    } catch (error) {
        console.log('CONNECT SEQUELIZE IS FAILED', error);
    }
};

module.exports = connectDB;
