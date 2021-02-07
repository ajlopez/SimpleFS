// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

contract FileStorage {
    string[] public fileNames;
    
    mapping(string => bytes) public filesContent;
    
    function get(string memory filename) public view returns (bytes memory content) {
        content = filesContent[filename];
    }
    
    function put(string memory filename, bytes memory content) public {
        filesContent[filename] = content;
    }
}

