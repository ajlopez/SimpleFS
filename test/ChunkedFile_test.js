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
    
    it('add first chunk', async function () {
        const content = Buffer.from('010203', 'hex');
        
        await file.put(0, content);
        
        const length = Number(await file.length());
        assert.equal(length, 3);
        
        const nochunks = Number(await file.noChunks());        
        assert.equal(nochunks, 1);
    });
});

