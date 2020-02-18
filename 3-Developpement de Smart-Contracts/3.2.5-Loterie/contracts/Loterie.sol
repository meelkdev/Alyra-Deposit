pragma solidity ^0.5.10;

import "./CagnotteFestival.sol";

contract Loterie is CagnotteFestival {
    
    uint freqLoterie = 5 days;
    uint counter = 0;
    
    uint lot = 0;
    
    mapping(address => bool) estParticipant;
    mapping(address => Jeu[]) jeuParticipant; // un participant peut avoir plusieurs jeux sur le même jour ou différents jours
    mapping(uint32 => uint8) resultatTirage;
    mapping(uint32 => address[]) gagnantsDuJour;
    
    struct Jeu {
        uint8 numero;
        uint32 jour;
    }
    
    modifier onlyFestivalier {
        require(festivaliers[msg.sender], "Vous devez être festivalier pour participer à la loterie");
        _;
    }
    
    modifier onlyParticipant {
        require(estParticipant[msg.sender], "Vous devez acheter un ticket pour participer à la loterie");
        _;
    }
    
    function acheterTicketLoterie(uint32 _jour, uint8 _numero) public payable onlyFestivalier {
        require(_jour > now, "le jour choisit est dépassé");
        require(_jour < dateLiquidation, "Le festival sera liquidé à cette date, pas de loterie");
        require(msg.value >= 100 finney);
        msg.sender.transfer(msg.value.sub(100 finney));
        estParticipant[msg.sender] = true;
        jeuParticipant[msg.sender].push(Jeu(_numero, _jour));
        lot += msg.value;
    }
    
    function nbAleatoire(uint32 _jour) internal returns(uint8) {
        uint result = uint(blockhash(block.number - 1));
        uint8 resultTirage = uint8(result);
        resultatTirage[_jour] = resultTirage;
        return resultTirage;
    }
    
    
    
    function retraitGain() external onlyParticipant {
        uint gains = 0;
        for (uint i = 0; i < jeuParticipant[msg.sender].length; i++) { //je ne sais pas encore si le require revert toute la fonction 
            Jeu memory jeuI = jeuParticipant[msg.sender][i];
            require(jeuI.jour < now, "la loterie n'est pas encore finie"); //ou passe simplement à l'itération suivante
            require(jeuI.numero == resultatTirage[jeuI.jour], "vous ne faites pas partie des gagnants du jour");
            gagnantsDuJour[jeuI.jour].push(msg.sender); 
            gains += lot.div(gagnantsDuJour[jeuI.jour].length);
        }
        msg.sender.transfer(gains);
    }
    
}