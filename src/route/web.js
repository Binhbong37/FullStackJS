const express = require('express');

const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/', homeController.homeController);

router.get('/crud', homeController.getCrud);

router.post('/post-crud', homeController.postCrud);

module.exports = router;
