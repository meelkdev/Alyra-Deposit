/* Autogenerated - do not fiddle */
            if(typeof(Contracts) === "undefined") var Contracts={};
            (function(module, Contracts) {
                var data = {
                    address: "0x6831c306fc03fa02750b09daa3eb155ae92b5115",
                    network: "browser",
                    endpoint: "http://ethereum-studio-browser",
                    abi: [
    {
        "constant": true,
        "inputs": [],
        "name": "artisteEnCours",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "passerArtisteSuivant",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_nomDArtiste",
                "type": "string"
            }
        ],
        "name": "sInscrire",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
                };
                Contracts["SceneOuverte"] = data;
                console.log(data);
                module.exports = data;
            })((typeof(module) === "undefined" ? {} : module), Contracts);