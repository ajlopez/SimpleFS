// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

contract ChunkedFile {
    address public owner;
    
    bytes[] public chunks;
    
    constructor() public {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }
    
    function setOwner(address newowner) public onlyOwner {
        owner = newowner;
    }
    
    function length() public view returns (uint) {
        uint length;
        
        for (uint k = 0; k < chunks.length; k++)
            length += chunks[k].length;
            
        return length;
    }
    
    function noChunks() public view returns (uint) {
        return chunks.length;
    }
    
    function setNoChunks(uint nchunks) public onlyOwner {
        while (chunks.length > nchunks)
            chunks.pop();
    }
    
    function get(uint nchunk) public view returns (bytes memory) {
        return chunks[nchunk];
    }
    
    function put(uint nchunk, bytes memory content) public onlyOwner {
        if (nchunk == chunks.length)
            chunks.push(content);
        else
            chunks[nchunk] = content;
    }
}

