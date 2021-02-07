const FileStorage = artifacts.require("FileStorage");

const fs = require('fs');
const path = require('path');

contract("FileStorage", function (accounts) {
    const alice = accounts[0];
    let storage;
    
    beforeEach(async function () {
        storage = await FileStorage.new();
    });
    
    it('get non existent file', async function () {
        const content = await storage.get('foo');
        
        assert.ok(content === null);
    });
    
    it('put and get file with three bytes', async function () {
        await storage.put('foo.bin', Buffer.from('010203', 'hex'));
        
        const content = await storage.get('foo.bin');
        
        assert.ok(content !== null);
        assert.equal(content, '0x010203');
    });
    
    it('put and get LICENSE file', async function () {
        const filename = path.join(__dirname, '..', 'LICENSE');
        const content = fs.readFileSync(filename);
        
        await storage.put('LICENSE', content);
        
        const result = await storage.get('LICENSE');
        
        assert.ok(result !== null);
        assert.equal(result.substring(2), content.toString('hex'));
    });
});

