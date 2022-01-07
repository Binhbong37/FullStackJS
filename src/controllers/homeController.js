const db = require('../models/index');
const CRUDService = require('../services/CRUDservices');

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

let getCrud = async (req, res) => {
    return res.render('crud');
};

let postCrud = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post ok');
};

module.exports = {
    homeController,
    getCrud,
    postCrud,
};
