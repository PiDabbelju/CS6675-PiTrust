// This script will be called when the smart contract is deployed via truffle migrate (independent of the target blockchain)
const Token = artifacts.require("PiTrust");
module.exports = function (deployer) {
    deployer.deploy(Token, 1000000000);
};