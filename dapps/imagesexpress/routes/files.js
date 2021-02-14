var express = require('express');
var router = express.Router();

const files = require('../lib/files');

/* GET file */
router.get('/:filename', async function(req, res, next) {
    const filename = req.params.filename;    
    const p = filename.indexOf('.');
    const address = p >= 0 ? filename.substring(0, p) : filename;
    const extension = p >= 0 ? filename.substring(p + 1) : '';
    
    const nchunks = await files.getNoChunks(address);

    res.set('Cache-control', 'public, max-age=3600');

    for (let k = 0; k < nchunks; k++)
        res.write(await files.getChunk(address, k));
    
    res.end();
});

module.exports = router;

