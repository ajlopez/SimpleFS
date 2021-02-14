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

const sender = utils.getAddress(config, from);
const receiver = utils.getAddress(config, to);

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
        
        const options = {};
        
        if (config.options && config.options.gasPrice)
            options.gasPrice = config.options.gasPrice;
        
        if (config.options && config.options.gas)
            options.gas = config.options.gas;
        
        const txh = await client.invoke(
            sender, 
            receiver, 
            "put(uint256,bytes)", 
            [ nochunk, '0x' + chunk.toString('hex') ],
            options
        );
        
        console.log('transaction', txh);
        
        if (typeof txh !== 'string')
            return;
        
        const txr = await client.receipt(txh, 120);
        console.log(txr && parseInt(txr.status) ? 'done' : 'failed');
    }
    catch (ex) {
        console.log(ex);
    }
}

(async function() {
    const nchunks = Number(await client.call(
        sender,
        receiver,
        "noChunks()",
        []
    ));
    
    const fh = fs.openSync(filename, 'w');
    
    let position = 0;
    
    try {
        for (let n = 0; n < nchunks; n++) {
            process.stdout.write(".");
            
            const bytes = await client.call(
                sender,
                receiver,
                "get(uint256)",
                [ n ]
            );
            
            const l = parseInt('0x' + bytes.substring(2 + 64, 2 + 64 + 64));
            
            const chunk = Buffer.from(bytes.substring(2 + 64 + 64, 2 + 64 + 64 + l * 2), 'hex');
            
            await promisify(cb => fs.write(fh, chunk, 0, chunk.length, position, cb));
            
            position += chunk.length;
        }
        
        console.log();
        console.log('done');
    }
    finally {
        fs.closeSync(fh);
    }
})();

