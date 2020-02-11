pragma solidity ^0.5.10;

contract Cogere {

mapping (address => uint) organisateurs;

constructor() internal {
    organisateurs[msg.sender] = 100;   
}

function transfererOrga(address _orga, uint _parts) public {
    organisateurs[_orga] = _parts;
    organisateurs[msg.sender] = organisateurs[msg.sender] - _parts;
}
    
function estOrga(address _orga) public view returns (bool){
    return organisateurs[_orga] > 0;
    }

}


contract CagnotteFestival is Cogere {

    uint public placesRestantes = 10000;
    uint private depensesTotales;
    mapping(address => bool) public festivaliers;
    mapping(address => bool) public estDonateur;
    mapping(address => bool) public estSponsor;
    Sponsor[] public sponsors;

    
    struct Sponsor {
        string nomSponsor;
        uint finance;
    }
    
   
    function acheterTicket() public payable {
        require(msg.value >= 500 finney, "Place à 0.5 Ethers, paiement incomplet");
        require(placesRestantes > 0, "Plus de places disponibles!");
        festivaliers[msg.sender] = true;
        placesRestantes--;
    }

    function payer(address payable _destinataire, uint _montant) public {
        require(estOrga(msg.sender));
        require(_destinataire != address(0));
        require(_montant > 0);
        _destinataire.transfer(_montant);
        comptabiliserDepense(_montant);
    }


    function comptabiliserDepense(uint _montant) private {
        depensesTotales += _montant;
    }

    function dons() external payable {
        require(msg.value > 0 wei, "Votre solde d'ether est à 0, mais nous apprécions le geste :)");
        estDonateur[msg.sender] = true;
    }

    function sponsoriser(string memory _nom) public payable {
        require(msg.value >= 30 ether, "Le sponsoring minimum est de 30 ethers");
        estSponsor[msg.sender] = true;
        sponsors.push(Sponsor(_nom, msg.value));
    }

}