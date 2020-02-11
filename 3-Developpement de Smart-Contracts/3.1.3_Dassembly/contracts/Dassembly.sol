pragma solidity ^0.5.7;

contract Dassembly {
    address[] membres;
    string[] descriptionDecisions;
    uint[] votesPour;
    uint[] votesContre;
    
    
    function rejoindre() public {
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
        if(estMembre(msg.sender)){
        descriptionDecisions.push(_description);
        votesPour.push(0);
        votesContre.push(0);
        }
    }

    function voter(uint _indice, bool _value) public {
        if (_value == true) {
            votesPour[_indice] += 1;
        } else {
            votesContre[_indice] += 1;
        }
    }

    function comptabiliser(uint _indice) public view returns (int) {
        return int(votesPour[_indice]) - int(votesContre[_indice]);
    }

}