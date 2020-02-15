pragma solidity ^0.5.10;

import "./SafeMath.sol";

contract Cogere {
    using SafeMath for uint;
    uint partsTotal = 100;
    mapping (address => uint) organisateurs;
    
    constructor() internal {
        organisateurs[msg.sender] = 100;
    }

    function transfererOrga(address _orga, uint _parts) public {
        organisateurs[_orga] = _parts;
        organisateurs[msg.sender] = organisateurs[msg.sender].sub(_parts);
    }
    
    function estOrga(address _orga) public view returns (bool){
        return organisateurs[_orga] > 0;
    }

}


contract CagnotteFestival is Cogere {

    uint public placesRestantes = 10000;
    uint private depensesTotales;
    uint payControl = 1 days;
    uint depensesMaxJ = 10 ether;
    uint dateFestival;
    uint dateLiquidation;
    mapping(address => bool) public festivaliers;
    mapping(address => bool) public estDonateur;
    mapping(address => bool) public estSponsor;
    mapping(uint => uint) depensesJ;
    Sponsor[] public sponsors;

    constructor(uint _date) public {
        dateFestival = _date; 
        dateLiquidation = dateFestival + 2 weeks;  
    }

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
        require(estOrga(msg.sender), "Vous n'êtes pas un organisateur du festival");
        require(_destinataire != address(0), "L'adresse du destinataire est nulle");
        require(_montant > 0, "vérifiez le montant saisit");
        require(block.timestamp < dateLiquidation, "Paiement impossible, date de liquidation dépassée");
        require(controlDepense(_montant), "Il faut attendre 24h avant une nouvelle dépense");
        _destinataire.transfer(_montant);
        comptabiliserDepense(_montant);
        depensesJ[jour(block.timestamp)] = depensesJ[jour(block.timestamp)].add(_montant);
    }

    function jour(uint _jour) internal view returns (uint) {
        return _jour.div(payControl);
    }

    function controlDepense(uint _montant) internal view returns (bool) {
        return depensesJ[jour(block.timestamp)].add(_montant) <= depensesMaxJ;
    }

    function comptabiliserDepense(uint _montant) private {
        depensesTotales = depensesTotales.add(_montant);
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

    function retrait() public {
  
        require(block.timestamp >= dateLiquidation, "La date de liquidation n'est pas atteinte!");
        uint toTransfer = (address(this).balance).mul(organisateurs[msg.sender].div(partsTotal));
        partsTotal = partsTotal.sub(organisateurs[msg.sender]);
        assert(partsTotal <= 100);
        delete organisateurs[msg.sender];
        msg.sender.transfer(toTransfer);
        if (partsTotal == 0) {
          selfdestruct(msg.sender);
        }
    }
}