let db = require('../models/index');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                // Check user is exist ( through email)
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password', 'firstName'],
                    raw: true,
                });
                if (user) {
                    // Check Pass here ( compare )
                    let check = await bcrypt.compareSync(
                        password,
                        user.password
                    );
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Pass is ok !!!';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password !!!';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User is not found`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = 'Your Email is not exist';
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
};

let checkUserEmail = (emailEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: emailEmail },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    },
                });
            } else if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password'],
                    },
                });
            }
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};

const createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email is exist
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email is exist, plz choose another email',
                });
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(
                    data.password
                );
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                });
                resolve({
                    errCode: 0,
                    errMessage: 'Tao dc nguoi dung REACT',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: id },
        });
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: "The user isn't exist",
            });
        }
        await db.User.destroy({
            where: { id: id },
        });

        resolve({
            errCode: 0,
            errMessage: 'User DELETED',
        });
    });
};

const updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required . . . !!',
                });
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                // await db.User.save({
                //     firstName: data.firstName,
                //     lastName: data.lastName,
                //     address: data.address
                // })

                resolve({
                    errCode: 0,
                    errMessage: 'Updated user !!',
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not Found',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Not Found type in db',
                });
            } else {
                let res = {};
                let allCode = await db.AllCode.findAll({
                    where: { type: typeInput },
                });
                res.errCode = 0;
                res.data = allCode;
                resolve(res);
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
    getAllCodeService,
};
