pragma solidity ^0.5.7;

contract Dassembly {
    address[] membres;
    /*string[] descriptionDecisions;
    uint[] votesPour;
    uint[] votesContre;*/
    Decision[] decisions;
    
    struct Decision {
        string description;
        uint votePour;
        uint voteContre;
        mapping (address => bool) aVote;
    }


    function rejoindre() public {
        require(!estMembre(msg.sender), "VOUS ETES DEJA MEMBRE DE L'ASSEMBLEE");
        membres.push(msg.sender);
    }

    function estMembre(address _user) public view returns (bool) {
        for (uint i = 0; i < membres.length; i++) {
            if (membres[i] == _user) {
            return true;
            }
        }
        return false;
    }

    function proposerDecision(string memory _description) public {
        require(estMembre(msg.sender), "VOUS N'ETES PAS MEMBRE DE L'ASSEMBLEE");
        Decision memory decisionSimple; //ou storage peut être ??
        decisionSimple.description = _description;
        decisionSimple.votePour = 0;
        decisionSimple.voteContre = 0;
        decisions.push(decisionSimple);
        
    }

    function voter(uint _indice, bool _value) public {
        require(estMembre(msg.sender), "VOUS N'ETES PAS MEMBRE DE L'ASSEMBLEE");
        require(decisions[_indice].aVote[msg.sender] == false, "VOUS AVEZ DEJA VOTE CETTE DECISION");
        if (_value == true) {
            decisions[_indice].votePour ++;
        } else {
            decisions[_indice].voteContre ++;
        }
        decisions[_indice].aVote[msg.sender] = true;
            
    }

    function comptabiliser(uint _indice) public view returns (int) {
        return int(decisions[_indice].votePour) - int(decisions[_indice].voteContre);
    }

}