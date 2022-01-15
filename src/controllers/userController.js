const userServices = require('../services/userServices');

const postLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameters! ',
        });
    }
    let userData = await userServices.handleUserLogin(email, password);
    console.log(userData);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : { Message: 'Not use USER' },
    });
};

const getHandleAllUsers = async (req, res) => {
    let id = req.query.id; // se lay het or 1 user

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing require parameter',
            users: [],
        });
    }
    let users = await userServices.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Find User Ok',
        users,
    });
};

const getHandleCreateUser = async (req, res) => {
    let message = await userServices.createNewUser(req.body);

    return res.status(200).json({ message });
};

const handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userServices.updateUser(data);

    return res.status(200).json({ message });
};

const handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required params',
        });
    }
    let message = await userServices.deleteUser(req.body.id);

    return res.status(200).json({ message });
};

const getAllCode = async (req, res) => {
    try {
        let data = await userServices.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (error) {
        console.log('getAllCode: ', error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server !!',
        });
    }
};

module.exports = {
    postLogin,
    getHandleAllUsers,
    getHandleCreateUser,
    handleEditUser,
    handleDeleteUser,
    getAllCode,
};
