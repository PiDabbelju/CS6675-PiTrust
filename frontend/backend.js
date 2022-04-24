/* ** VARIABLES ** */
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

// Ganache local
var url = 'http://127.0.0.1:7545'  
var contractAddress = "0x31A37E7032D82CB33086144dAD991DAd0480994a"

// Deployment on Polygon Mumbai Testnet (via Alchemy)
var url = 'https://polygon-mumbai.g.alchemy.com/v2/pCYAWJeXr0UoBRbne7EwBZL3pgrL5Ulw'
var contractAddress = "0xD5D02341C1163957a3a5f85c84cE27a7ee12C3F4"

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
var isLocal = true
var accounts
this.web3.eth.getAccounts().then(accounts => {
    this.currentUser = accounts[0]
   })
// Check if account is available. If not, likely working on real blockchain (via Metamask)
if (!accounts) {
    openMetamask()
}

/* ** ** */
/* ** FUNCTIONS ** */
async function sendRating(targetAddress, topic, rating) {
    if (isLocal) {  // Local blockchain
        await contract.methods.rate(targetAddress, topic, rating).send({from: accounts[0], gas: 300000})
        var result = getRating(targetAddress, topic)
    } else {  // Interface via Metamask
        const transactionParameters = {
            from: accounts[0],
            to: contractAddress,
            data: contract.methods.rate(targetAddress, topic, rating).encodeABI()   
        };
        // popup - request the user to sign and broadcast the transaction
        await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });        
    }
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
    if (isLocal) {  // Local blockchain
        await contract.methods.addFunds(targetAddress).send({from: accounts[0]})
    } else {  // Interface via Metamask
        const transactionParameters = {
            from: accounts[0],
            to: contractAddress,
            data: contract.methods.addFunds(targetAddress).encodeABI()   
        };
        // popup - request the user to sign and broadcast the transaction
        await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });        
    }
        console.log("Funds added to " + targetAddress)
}

async function approve() {
    if (isLocal) {  // Local blockchain
        await contract.methods.approve(contractAddress, 1000).send({from: accounts[0]})
        var approved = await contract.methods.allowance(accounts[0], contractAddress).call()
    } else {  // Interface via Metamask
        const transactionParameters = {
            from: accounts[0],
            to: contractAddress,
            data: contract.methods.approve(contractAddress, 1000).encodeABI()   
        };
        // popup - request the user to sign and broadcast the transaction
        await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });        
    }
    console.log(accounts[0] + " approved usage of " + approved + " Tokens")
}

async function getRating(targetAddress, topic) {
    var result = await contract.methods.getRating(targetAddress, topic).call()
    console.log("Returned rating in topic " + topic + " for address " + accounts[0])
    return result / 10000
}

// * Added for Real-world deployment (testnet) -> Request account from Metamask
async function openMetamask() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts[0])
    isLocal = false;
}