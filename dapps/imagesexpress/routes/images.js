var express = require('express');
var router = express.Router();

const images = {
    "0xce5cf24112ffc8483c40f32277a55bd67f211f2f": {
        title: 'Landscape',
        description: 'Watercolor painting practice',
        name: "0xce5cf24112ffc8483c40f32277a55bd67f211f2f.jpg",
        height: 1903,
        width: 2983
    },
    "0xaa657e23d197b702fe74e620be8a78dada87993a": {
        title: 'Landscape',
        description: 'Watercolor painting practice',
        name: "0xaa657e23d197b702fe74e620be8a78dada87993a.jpg"
    },
    "0x1eb0c9073fd01476a85501e2f7dca95d6571be9c": {
        title: 'Landscape',
        description: 'Watercolor painting practice',
        name: "0x1eb0c9073fd01476a85501e2f7dca95d6571be9c.jpg",
        height: 2153,
        width: 2066
    }
}

/* Show image */
router.get('/:filename', async function(req, res, next) {
    const address = req.params.filename;    
    
    res.render('image', images[address]);
});

module.exports = router;

