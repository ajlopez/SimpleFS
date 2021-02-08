const ChunkedFile = artifacts.require("ChunkedFile");

const fs = require('fs');
const path = require('path');

contract("ChunkedFile", function (accounts) {
    const alice = accounts[0];
    
    let file;
    
    beforeEach(async function () {
        file = await ChunkedFile.new();
    });
    
    it('initial length', async function () {
        const length = Number(await file.length());
        
        assert.equal(length, 0);
    });
    
    it('initial number of chunks', async function () {
        const nochunks = Number(await file.noChunks());
        
        assert.equal(nochunks, 0);
    });
    
    it('put and get first chunk', async function () {
        const bytes = Buffer.from('010203', 'hex');
        
        await file.put(0, bytes);
        
        const length = Number(await file.length());
        assert.equal(length, 3);
        
        const nochunks = Number(await file.noChunks());        
        assert.equal(nochunks, 1);
        
        const content = await file.get(0);
        assert.ok(content !== null);
        assert.equal(content.substring(2), bytes.toString('hex'));
    });
});

