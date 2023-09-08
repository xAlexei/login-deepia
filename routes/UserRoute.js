const router = require('express').Router();
const UserController = require("../controllers/UserController");

router.post('/create', UserController.create)
router.get('/retrieve', UserController.retrieve);
router.post('/login', UserController.login);



module.exports = router;