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

    mapping(address => bool) public festivaliers;
    uint placesRestantes = 10000;
   
    function acheterTicket() public payable {
        require(msg.value >= 500 finney, "Place à 0.5 Ethers, fonds insuffisants");
        require(placesRestantes > 0, "Plus de places disponibles!");
        festivaliers[msg.sender] = true;
        placesRestantes--;
    }

    function payer(address payable destinataire, uint montant) public {
        require(estOrga(msg.sender));
        require(destinataire != address(0));
        require(montant > 0);
        destinataire.transfer(montant);
    }

}