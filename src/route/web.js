const express = require('express');

const router = express.Router();

const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');

router.get('/', homeController.homeController);

router.get('/crud', homeController.getCrud);

router.post('/post-crud', homeController.postCrud);

router.get('/get-crud', homeController.getDisplayCRUD);

router.get('/edit-crud', homeController.getEditCrud);

router.post('/put-crud', homeController.putUserCrud);

router.get('/delete-crud', homeController.deleteUserCrud);

router.post('/api/login', userController.postLogin);

module.exports = router;
