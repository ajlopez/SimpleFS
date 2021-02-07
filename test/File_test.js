const File = artifacts.require("File");

const fs = require('fs');
const path = require('path');

contract("File", function (accounts) {
    const alice = accounts[0];
    
    it('create file with three bytes', async function () {
        const file = await File.new(Buffer.from('010203', 'hex'));
        
        const content = await file.content();
        
        assert.ok(content !== null);
        assert.equal(content, '0x010203');
    });
    
    it('create LICENSE file', async function () {
        const filename = path.join(__dirname, '..', 'LICENSE');
        const content = fs.readFileSync(filename);
        
        const file = await File.new(content);
        
        const result = await file.content();
        
        assert.ok(result !== null);
        assert.equal(result.substring(2), content.toString('hex'));
    });
});

