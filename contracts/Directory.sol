// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

contract Directory {
    mapping(string => address) public items;
    
    function link(string memory name, address item) public {
        items[name] = item;
    }
    
    function unlink(string memory name) public {
        delete items[name];
    }
}

