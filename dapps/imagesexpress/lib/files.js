
const rskapi = require('rskapi');

// alice
const sender = "0x81417a88177e1c06ea4b9684203c33a8e4ad99b0";

let client;

function openClient(host) {
    client = rskapi.client(host);
}

async function getNoChunks(address) {
    return parseInt(await client.call(
        sender,
        address,
        "noChunks()",
        []
    ));
};

async function getChunk(address, nchunk) {
    const bytes = await client.call(
        sender,
        address,
        "get(uint256)",
        [ nchunk ]
    );
    
    const l = parseInt('0x' + bytes.substring(2 + 64, 2 + 64 + 64));
    
    return Buffer.from(bytes.substring(2 + 64 + 64, 2 + 64 + 64 + l * 2), 'hex');
}

module.exports = {
    openClient,
    getChunk,
    getNoChunks
}

