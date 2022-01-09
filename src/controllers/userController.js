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

module.exports = {
    postLogin,
};
