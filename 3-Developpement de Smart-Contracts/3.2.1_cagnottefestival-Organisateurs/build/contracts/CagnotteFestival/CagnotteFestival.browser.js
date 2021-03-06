/* Autogenerated - do not fiddle */
            if(typeof(Contracts) === "undefined") var Contracts={};
            (function(module, Contracts) {
                var data = {
                    address: "0x5e523b4eb7a0dcb697e1bb2faf754cb445fbbedf",
                    network: "browser",
                    endpoint: "http://ethereum-studio-browser",
                    abi: [
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "organisateurs",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_orga",
                "type": "address"
            },
            {
                "name": "_parts",
                "type": "uint256"
            }
        ],
        "name": "transfererOrga",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_orga",
                "type": "address"
            }
        ],
        "name": "estOrga",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
]
                };
                Contracts["CagnotteFestival"] = data;
                console.log(data);
                module.exports = data;
            })((typeof(module) === "undefined" ? {} : module), Contracts);