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
    
    it('initial owner', async function () {
        const owner = Number(await file.owner());
        
        assert.equal(owner, alice);
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
    
    it('put and get two chunks', async function () {
        const bytes0 = Buffer.from('010203', 'hex');
        const bytes1 = Buffer.from('0405', 'hex');
        
        await file.put(0, bytes0);
        await file.put(1, bytes1);
        
        const length = Number(await file.length());
        assert.equal(length, 5);
        
        const nochunks = Number(await file.noChunks());        
        assert.equal(nochunks, 2);
        
        const content0 = await file.get(0);
        assert.ok(content0 !== null);
        assert.equal(content0.substring(2), bytes0.toString('hex'));
        
        const content1 = await file.get(1);
        assert.ok(content1 !== null);
        assert.equal(content1.substring(2), bytes1.toString('hex'));
    });
    
    it('put and get two chunks then discard last one', async function () {
        const bytes0 = Buffer.from('010203', 'hex');
        const bytes1 = Buffer.from('0405', 'hex');
        
        await file.put(0, bytes0);
        await file.put(1, bytes1);
        await file.setNoChunks(1);
        
        const length = Number(await file.length());
        assert.equal(length, 3);
        
        const nochunks = Number(await file.noChunks());        
        assert.equal(nochunks, 1);
        
        const content0 = await file.get(0);
        assert.ok(content0 !== null);
        assert.equal(content0.substring(2), bytes0.toString('hex'));
    });
});

