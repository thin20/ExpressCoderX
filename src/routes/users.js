const express = require('express');
const router = express.Router();

const UserController = require('../app/controllers/UserController');
const validate = require('../app/middlewares/user.validate');

router.get('/create', UserController.create);
router.post('/create', validate.postCreateUser, UserController.addUser);
router.get('/search', UserController.search);
router.get('/:id', UserController.viewUser);
router.get('/', UserController.users)

module.exports = router;