pragma solidity ^0.5.10;

contract SceneOuverte {
    
    string[12] passagesArtistes;
    uint creneauxLibres = 12;
    uint tour;

    function sInscrire(string memory _nomDArtiste) public { 
        if (creneauxLibres > 0) {
                passagesArtistes[12-creneauxLibres] = _nomDArtiste;
                creneauxLibres -= 1;
        }
    }

    function passerArtisteSuivant() public {
        if (tour<12) {
        tour += 1;
        }
    }

    function artisteEnCours() public view returns (string memory){
        if (tour < 12){
        return passagesArtistes[tour];
        } else {
           return  "FIN";
        }
    }
}