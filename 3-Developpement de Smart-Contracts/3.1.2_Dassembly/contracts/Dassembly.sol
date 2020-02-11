pragma solidity ^0.5.7;

contract Dassembly {
    address[] membres;
    address user;
    
    function rejoindre() public {
        membres.push(msg.sender);
    }

    function estMembre(address _user) public view returns (bool) {
        for (uint i = 0; i < membres.length; i++) {
            if (membres[i] == _user) {
            return true;
            }
        }
    }
}