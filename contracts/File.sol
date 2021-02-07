// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

contract File {
    bytes public content;
    
    constructor(bytes memory _content) public {
        content = _content;
    }
    
    function length() public view returns (uint) {
        return content.length;
    }
}

