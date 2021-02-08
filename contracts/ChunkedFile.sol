// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

contract ChunkedFile {
    bytes[] public chunks;
    
    function length() public view returns (uint) {
        uint length;
        
        for (uint k = 0; k < chunks.length; k++)
            length += chunks[k].length;
            
        return length;
    }
    
    function noChunks() public view returns (uint) {
        return chunks.length;
    }
    
    function get(uint nchunk) public view returns (bytes memory) {
        return chunks[nchunk];
    }
    
    function put(uint nchunk, bytes memory content) public {
        if (nchunk == chunks.length)
            chunks.push(content);
        else
            chunks[nchunk] = content;
    }
}

