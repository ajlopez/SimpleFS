const utils = require('./lib/utils');
const rskapi = utils.rskapi;

const fs = require('fs');

// from https://ethereum.stackexchange.com/questions/11444/web3-js-with-promisified-api

const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }

      resolve(res);
    })
);

const config = utils.loadConfiguration('./config.json');
const client = rskapi.client(config.host);

const from = process.argv[2];
const to = process.argv[3];
const filename = process.argv[4];
const chunksize = parseInt(process.argv[5]);

const sender = utils.getAccount(config, from);
const receiver = utils.getAddress(config, to);

const bytes = fs.readFileSync(filename);
const flength = bytes.length;

async function uploadChunk(nochunk) {
    console.log('chunk', nochunk);
    
    try {
        while (true) {
            const nonce1 = Number(await client.nonce(sender.address, 'latest'));
            const nonce2 = Number(await client.nonce(sender.address, 'pending'));
            
            if (nonce2 - nonce1 >= 5)
                await promisify(cb => setTimeout(cb, 1000));
            else
                break;
        }
        
        const chunk = bytes.slice(nochunk * chunksize, nochunk * chunksize + chunksize);
        
        const txh = await client.invoke(
            sender, 
            receiver, 
            "put(uint256,bytes)", 
            [ nochunk, '0x' + chunk.toString('hex') ]
        );
        
        console.log('transaction', txh);
//        const txr = await client.receipt(txh, 0);
//        console.log(txr && parseInt(txr.status) ? 'done' : 'failed');
    }
    catch (ex) {
        console.log(ex);
    }
}

(async function() {
    let nchunks = Number(await client.call(
        sender.address,
        receiver,
        "noChunks()",
        []
    ));
    
    while (nchunks * chunksize < flength) {
        await uploadChunk(nchunks);
        
        nchunks++;
    }
})();

