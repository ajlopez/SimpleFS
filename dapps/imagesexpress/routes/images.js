var express = require('express');
var router = express.Router();

const imagesdata = require('../lib/imagesdata');
/* Show image */
router.get('/:filename', async function(req, res, next) {
    const address = req.params.filename;    
    
    res.render('image', imagesdata[address]);
});

module.exports = router;

