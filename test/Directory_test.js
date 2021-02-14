const Directory = artifacts.require("Directory");

contract("Directory", function (accounts) {
    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
    
    const alice = accounts[0];
    const bob = accounts[1];
    const charlie = accounts[2];
    
    beforeEach(async function () {
        directory = await Directory.new();
    });
    
    it('get unknown item as address as zero', async function () {
        const address = await directory.items("foo");
        
        assert.equal(address, ZERO_ADDRESS);
    });
    
    it('link item', async function () {
        await directory.link("bob", bob);

        const address = await directory.items("bob");
        
        assert.equal(address, bob);
    });
    
    it('link and unlink item', async function () {
        await directory.link("bob", bob);
        await directory.unlink("bob");

        const address = await directory.items("bob");
        
        assert.equal(address, ZERO_ADDRESS);
    });
});

