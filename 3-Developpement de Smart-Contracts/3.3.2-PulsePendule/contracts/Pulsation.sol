pragma solidity ^0.5.10;

contract Pulsation {
    uint public battement;
    string private message;

    constructor(string memory _msg) public {
        battement = 0;
        message = _msg;
    }

    function ajouterBattement() public returns(string memory) {
        battement++;
        return message;
    }
}


contract Pendule {

 Pulsation internal pulse;
 
 constructor(string memory _msg) public {
        pulse = new Pulsation(_msg);
    }

 function provoquerUnePulsation() public {
   pulse.ajouterBattement();
 }
 
}