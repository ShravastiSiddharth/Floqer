const express = require('express');
const {gorqChat} = require('../controllers/gorqController');

const router = express.Router();

router.post('/chat', gorqChat);

module.exports = router;