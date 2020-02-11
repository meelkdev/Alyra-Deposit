pragma solidity ^0.5.10;

contract CagnotteFestival {

    mapping(address => uint) public organisateurs;

    constructor() public {
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