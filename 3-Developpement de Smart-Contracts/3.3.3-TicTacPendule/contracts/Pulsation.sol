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

    string[] public balancier;
    Pulsation tic;
    Pulsation tac;
 
    constructor() public {
        tic = new Pulsation("tic");
        tac = new Pulsation("tac");
    }
    
    function ajouterTicTac(Pulsation _tic, Pulsation _tac) public {
        tic = _tic;
        tac = _tac;
        tic.ajouterBattement();
        tac.ajouterBattement();
        
    }

    function mouvementsBalancier() public {
        ajouterTicTac(tic, tac);
        balancier.push(tic.ajouterBattement());
        balancier.push(tac.ajouterBattement());
    }
}


