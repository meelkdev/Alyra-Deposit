pragma solidity ^0.5.7;

contract Dassembly {

    string public nomAssemblee;
    mapping (address => bool) membres;
    Decision[] public decisions;
    address admin;
    mapping (address => bool) admins;
    mapping (address => uint) countBlame;

    modifier onlyAdmin {
        require(msg.sender == admin);
        _;
    }
    
    modifier onlyAdmins {
        require(admins[msg.sender]);
        _;
    }
    
    struct Decision {
        string description;
        uint votePour;
        uint voteContre;
        mapping (address => bool) aVote;
        uint dateFin;
    }

    constructor(string memory _nom) public {
        nomAssemblee = _nom;
        admin = msg.sender;
        admins[admin] = true;
    }

    function nommerAdmin(address _user) public onlyAdmin {
        admins[_user] = true; 
    } 

    function demissAdmin() public onlyAdmins {
        admins[msg.sender] = false;
    }

    function closeDecision(uint _indice) public onlyAdmins {
        decisions[_indice].dateFin = now;
    }

    function blamer(address _user) public onlyAdmins {
        countBlame[_user]++;
        if (countBlame[_user] > 2) {
            membres[_user] = false;
        }
    }

    function rejoindre() public {
        require(!membres[msg.sender], "VOUS ETES DEJA MEMBRE DE L'ASSEMBLEE");
        membres[msg.sender] = true;
    }

    function proposerDecision(string memory _description) public {
        require(membres[msg.sender], "VOUS N'ETES PAS MEMBRE DE L'ASSEMBLEE");
        decisions.push(Decision(_description,0,0,now + 10 days));
        
    }

    function voter(uint _indice, bool _value) public {
        require(_indice < decisions.length && _indice >= 0, "DECISION INEXISTANTE, VERIFIER l'INDICE INDIQUE");
        require(membres[msg.sender], "VOUS N'ETES PAS MEMBRE DE L'ASSEMBLEE");
        require(!decisions[_indice].aVote[msg.sender], "VOUS AVEZ DEJA VOTE CETTE DECISION");
        require(decisions[_indice].dateFin > now, "LE VOTE EST CLÔTURE POUR CETTE DECISION");
        if (_value) {
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