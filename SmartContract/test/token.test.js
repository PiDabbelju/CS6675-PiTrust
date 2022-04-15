const Token = artifacts.require("PiTrust");

contract("PiTrust", (accounts) => {
    it("should send the initial token supploy to the owner wallet", async () => {
        const token = await Token.deployed();
        const balance = await Token.balanceOf(accounts[0]);
        assert.equal(Token.toNumber(), 10000);
    });
    it("should transfer 100 token from the accounts[0] to accounts[1]", async () => {
        const token = await Token.deployed();
        await token.transfer(accounts[1], 100, { from: accounts[0]});
        const balance = await token.balanceOf(accounts[1]);
        assert.equal(balance.toNumber(), 100);
    });
});