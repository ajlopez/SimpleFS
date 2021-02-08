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
}

