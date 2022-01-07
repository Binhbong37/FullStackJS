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

let getDisplayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    return res.render('displayCRUD', {
        dataTable: data,
    });
};

let getEditCrud = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);

        return res.render('edit-Crud', {
            dataUser: userData,
        });
    } else {
        return res.send('with id FAILED ');
    }
};

let putUserCrud = async (req, res) => {
    let data = req.body;
    let newUser = await CRUDService.updateUserData(data);

    return res.render('displayCRUD', {
        dataTable: newUser,
    });
};

module.exports = {
    homeController,
    getCrud,
    postCrud,
    getDisplayCRUD,
    getEditCrud,
    putUserCrud,
};
