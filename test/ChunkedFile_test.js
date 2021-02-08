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
});

