/* ** VARIABLES ** */
// Ganache GUI local
var url = 'http://127.0.0.1:7545'  
var contractAbi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "initialSupply",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "targetAddress",
                "type": "address"
            }
        ],
        "name": "addFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "entities",
        "outputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "targetAddress",
                "type": "address"
            }
        ],
        "name": "getAllTopics",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "topic",
                "type": "string"
            }
        ],
        "name": "getEntities",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "targetAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "field",
                "type": "string"
            }
        ],
        "name": "getRating",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "targetAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "field",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "rating",
                "type": "uint256"
            }
        ],
        "name": "rate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "topics",
        "outputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "targetAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "rating",
                "type": "uint256"
            }
        ],
        "name": "transferOnRating",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
var contractAddress = "0x31A37E7032D82CB33086144dAD991DAd0480994a"

// Alchemy
//var url = "https://eth-mainnet.alchemyapi.io/v2/cWvKZZ0xiadjMZfOHfHwd9A_Zvm_b2_3";
//var address = "0x00000000219ab540356cBB839Cbe05303d7705Fa"  // ETH2 staking contract

/* ** ** */
/* INITIALIZATION */
// Connect a the web3 provider
if (typeof web3 !== 'undefined') {
    web3 = new Web3(ethereum.currentProvider)
} else {
    web3 = new Web3(new Web3.providers.HttpProvider(url))
}
// Create Web3 object
var web3 = new Web3(url)
// Get the contract object
var contract = new web3.eth.Contract(contractAbi, contractAddress)
// Set a default account
window.ethereum.request({ method: 'eth_requestAccounts' })
// Needs to be synchronous
this.web3.eth.getAccounts().then(accounts => {
    this.currentUser = accounts[0]
    web3.eth.Contract.defaultAccount = accounts[0]
   })

/* ** ** */
/* ** FUNCTIONS ** */
async function sendRating(targetAddress, topic, rating) {
    await contract.methods.rate(targetAddress, topic, rating).send({from: web3.eth.Contract.defaultAccount, gas: 300000})
    var result = getRating(targetAddress, topic)
    console.log("Rating sent to smart contract")
    return result
}

async function queryAddress(targetAddress) {
    var balance = await contract.methods.balanceOf(targetAddress).call()
    var topics = await contract.methods.getAllTopics(targetAddress).call()
    console.log("Balance: " + balance)
    console.log("Topics: " + topics)
    var resTopics = new Array();
    for (const tid in topics) {
        resTopics[topics[tid]] = await getRating(targetAddress, topics[tid])
    }
    return {balance: balance, topics: resTopics}
}

async function listExperts(topic) {
    var experts = await contract.methods.getEntities(topic).call()
    var medExperts = new Array();
    for (const eid in experts) {
        var address = experts[eid]
        await getRating(address, topic)
        .then(result => {
            medExperts.push([address, result])    
            // Re-Sort list and update
            var resExperts = medExperts.sort(function(a,b) {return b[1]-a[1]});
            output = "<br /><b>Top experts for topic</b> " + topic + "<br />"
            listOutput.innerHTML = "<br /><b>Top experts for topic</b> " + topic + "<br />"
            for (eid2 in resExperts) {
                var line = "<b>" + resExperts[eid2][1] + "</b> --- " + resExperts[eid2][0] +  "<br />"
                output += line
                listOutput.innerHTML += line
            }
        })
    }
    console.log("Experts for topic " + topic + " searched.")
    return {resExperts: experts}
}

async function addFunds(targetAddress) {
    await contract.methods.addFunds(targetAddress).send({from: web3.eth.Contract.defaultAccount})
    console.log("Funds added to " + targetAddress)
}

async function approve() {
    await contract.methods.approve(contractAddress, 1000).send({from: web3.eth.Contract.defaultAccount})
    var approved = await contract.methods.allowance(web3.eth.Contract.defaultAccount, contractAddress).call()
    console.log(web3.eth.Contract.defaultAccount + " approved usage of " + approved + " Tokens")
}

async function getRating(targetAddress, topic) {
    var result = await contract.methods.getRating(targetAddress, topic).call()
    console.log("Returned rating in topic " + topic + " for address " + web3.eth.Contract.defaultAccount)
    return result / 10000
}