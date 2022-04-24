const Token = artifacts.require("PiTrust");
module.exports = function (deployer) {
    deployer.deploy(Token, 1000000000);
};