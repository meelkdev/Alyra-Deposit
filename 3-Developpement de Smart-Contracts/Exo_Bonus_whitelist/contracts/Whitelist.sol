pragma solidity ^0.5.10;

contract Whitelist {
    struct Personne {
        string nom;
        string prenom;
    }
    mapping(address => Personne) public persons ;
    address administrateur;
    uint expiration;

    modifier onlyAdmin {
        require(msg.sender == administrateur);
        _;
    }

    modifier isNotExpired {
        require(now == expiration);
        _;
        
    }

    constructor() public {
        administrateur = msg.sender;
        expiration = now + 10 days;
    }

    function ajouterPerson(string memory _nom, string memory _prenom, address _address) public onlyAdmin isNotExpired {
        Personne memory p = Personne(_nom,_prenom);
        persons[_address] = p;
    }

    
}