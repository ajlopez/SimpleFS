const Directory = artifacts.require("Directory");
const File = artifacts.require("File");

const fs = require('fs');
const path = require('path');

contract("Directory", function (accounts) {
    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
    
    const alice = accounts[0];
    let directory;
    let smallFile;
    
    beforeEach(async function () {
        directory = await Directory.new();
        smallFile = await File.new(Buffer.from('010203', 'hex'));
    });
    
    it('get unknown file address as zero', async function () {
        const address = await directory.files("foo");
        
        assert.equal(address, ZERO_ADDRESS);
    });
    
    it('link small file', async function () {
        await directory.linkFile("foo.bin", smallFile.address);

        const address = await directory.files("foo.bin");
        
        assert.equal(address, smallFile.address);
    });
    
    it('link and unlink small file', async function () {
        await directory.linkFile("foo.bin", smallFile.address);
        await directory.unlinkFile("foo.bin");

        const address = await directory.files("foo.bin");
        
        assert.equal(address, ZERO_ADDRESS);
    });
});

