const db = require('../models/index');

let homeController = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage', {
            data: JSON.stringify(data),
        });
    } catch (error) {
        console.log('loi get data from db');
    }
};

module.exports = {
    homeController,
};
