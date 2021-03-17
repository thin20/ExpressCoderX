const express = require('express');
const router = express.Router();

const path = require('path');

const multer = require('multer');

const UserController = require('../app/controllers/UserController');
const validate = require('../app/middlewares/user.validate');

const upload = multer({ dest: path.resolve(__dirname, '../public/uploads') });

router.get('/create', UserController.create);
router.post('/create', upload.single('avatar'), validate.postCreateUser, UserController.addUser);
router.get('/search', UserController.search);
router.get('/:id', UserController.viewUser);
router.get('/', UserController.users)

module.exports = router;