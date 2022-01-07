const express = require('express');

const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/', homeController.homeController);

router.get('/crud', homeController.getCrud);

router.post('/post-crud', homeController.postCrud);

router.get('/get-crud', homeController.getDisplayCRUD);

router.get('/edit-crud', homeController.getEditCrud);

router.post('/put-crud', homeController.putUserCrud);

module.exports = router;
