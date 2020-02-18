pragma solidity ^0.5.10;

contract Pulsation {
    uint battement;

    constructor() public {
        battement = 0;
    }

    function ajouterBattement() public {
        battement++;
    }
}