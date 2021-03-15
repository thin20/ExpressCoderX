const express = require('express');
const router = express.Router();

const UserController = require('../app/controllers/UserController');

router.get('/create', UserController.create);
router.post('/create', UserController.addUser);
router.get('/search', UserController.search);
router.get('/:id', UserController.viewUser);
router.get('/', UserController.users)

module.exports = router;