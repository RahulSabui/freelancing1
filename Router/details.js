var express = require('express');
var router = express.Router();

const DetailsController = require("../App/Controller/DetailController")

/* GET home page. */
router.post('/create', DetailsController.createDetails);
router.get('/details/:user_id', DetailsController.getDetail);




module.exports = router;