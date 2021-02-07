// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "./File.sol";

contract Directory {
    mapping(string => File) public files;
    mapping(string => Directory) public directories;
    
    function linkFile(string memory filename, File file) public {
        files[filename] = file;
    }
    
    function unlinkFile(string memory filename) public {
        delete files[filename];
    }
    
    function linkDirectory(string memory dirname, Directory directory) public {
        directories[dirname] = directory;
    }
    
    function unlinkDirectory(string memory dirname) public {
        delete directories[dirname];
    }
}

