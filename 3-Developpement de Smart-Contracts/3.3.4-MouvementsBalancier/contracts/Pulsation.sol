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
    }

    function mouvementsBalancier(uint k) public {
        ajouterTicTac(tic, tac);
        if (k % 2 == 0) {
            for (uint i=1; i<= k/2; i++) {
                balancier.push(tic.ajouterBattement());
                balancier.push(tac.ajouterBattement());
            }
        } else {
            for (uint i=1; i<= (k-1)/2; i++) {
                balancier.push(tic.ajouterBattement());
                balancier.push(tac.ajouterBattement());
            }
            balancier.push(tic.ajouterBattement());
        }
    }
}
