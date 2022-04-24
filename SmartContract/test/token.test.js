const { doesNotMatch } = require("assert");

const Token = artifacts.require("PiTrust");

contract("PiTrust", (accounts) => {
    it("perform tests", async () => {
        const token = await Token.deployed()
        const topic = "Test"
        const totalRepetitions = 5000
        const totalAdresses = 100
        const totalUpVoters = 10
        const totalDownVoters = 10
        const startTokensArr = [100, 1000, 10000, 100000]
        const initialSupply = 1000000000
        
        for (let startTokenIdx = 0; startTokenIdx < startTokensArr.length; startTokenIdx++)
        {
            var startTokens = startTokensArr[startTokenIdx]
            console.log("Start test with " + startTokens + " initial tokens for each account")

            // Initialize CSV Writer
            const fs = require("fs")
            const writeStream = fs.createWriteStream('results_' + startTokens + '.csv');

            // Donate tokens to all accounts
            for(let i=1; i<=totalAdresses; i++) {
                await token.transfer(accounts[i], startTokens.toString())
                await token.approve(token.address, totalRepetitions*10, {from: accounts[i]})
            }
            // Initialize array storing all balances
            var balances = new Array(totalAdresses+1).fill(startTokens)
            balances[0] = initialSupply - totalAdresses*startTokens
            var ratings = new Array(totalAdresses+1).fill(0)


            // Chose random addresses for down- and upvoting
            var downVoteTarget = Math.floor(Math.random() * totalAdresses + 1)
            var upVoteTarget = Math.floor(Math.random() * totalUpVoters + 1)

            // Main loop: Perform <totalRepetitions> ratings
            for(let i=0; i<totalRepetitions; i++) {
                var voter
                var target
                var targetAddress
                var targetRating

                //console.log("Iteration " + i)

                // Determine eligible voter
                voter = Math.floor(Math.random() * totalAdresses + 1)

                // Ensure "fair share" for malicious users
                if (i%50 == 0) {
                    voter = (voter%(totalUpVoters+totalDownVoters)) + 1
                }

                // Determine voting
                if (voter <= totalUpVoters) {  // => Upvoter
                    target = upVoteTarget
                    targetRating = 10
                }
                else if ((totalUpVoters <= voter) && (voter <= totalDownVoters + totalUpVoters)) {  // => Downvoter
                    target = downVoteTarget
                    targetRating = 1
                } else {  // Normal user (random)
                    target = Math.floor(Math.random() * totalAdresses + 1)
                    targetRating = Math.floor(Math.random() * 10) + 1
                }
                targetAddress = accounts[target]

                // Send rating to smart contract
                var result
                var gasFees
                try {
                    result = await token.rate(targetAddress, topic, targetRating, {from: accounts[voter], gas: 300000})
                    gasFees = result.receipt.gasUsed
                    //console.log(result.receipt.gasUsed)
                } catch (error) {
                    gasFees = 0
                    //console.log("Reverted (likely insufficient balance)")
                }
                
                // Update tracking arrays
                balances[voter] = await token.balanceOf(accounts[voter])
                balances[target] = await token.balanceOf(accounts[target])
                ratings[target] = await token.getRating(accounts[target], topic)


                // Write results (Iteration, Voter, Target, Gas Fees, Balances) to CSV
                writeStream.write(i + "," + voter + "," + target + "," + gasFees + "," + targetRating + ",")
                balances.forEach(value => writeStream.write(`${value},`))
                ratings.forEach(value => writeStream.write(`${value},`))
                writeStream.write("\n")
            }

            // Cleanup: Reset token balances
            for(let i=1; i<=totalAdresses; i++) {
                var balance = token.balanceOf(accounts[i])
                await token.transfer(accounts[0], balance, {from: accounts[i]})
                balances[i] = 0
            }


            writeStream.end();
        }
    });
});