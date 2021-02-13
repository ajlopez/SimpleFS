const utils = require('./lib/utils');
const rskapi = utils.rskapi;

const fs = require('fs');

const config = utils.loadConfiguration('./config.json');
const client = rskapi.client(config.host);

const from = process.argv[2];
const to = process.argv[3];
const filename = process.argv[4];
const chunksize = parseInt(process.argv[5]);
const nochunk = parseInt(process.argv[6]);

const sender = utils.getAccount(config, from);
const receiver = utils.getAddress(config, to);

const bytes = fs.readFileSync(filename);
const chunk = bytes.slice(nochunk * chunksize, nochunk * chunksize + chunksize);

(async function() {
    try {
        const txh = await client.invoke(
            sender, 
            receiver, 
            "put(uint256,bytes)", 
            [ nochunk, '0x' + chunk.toString('hex') ]
        );
        console.log('transaction', txh);
        const txr = await client.receipt(txh, 0);
        console.log(txr && parseInt(txr.status) ? 'done' : 'failed');
    }
    catch (ex) {
        console.log(ex);
    }
})();

