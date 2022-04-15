pragma solidity ^0.8.13;
// SPDX-License-Identifier: UNLICENSED

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract PiTrust is ERC20 {
    using SafeMath for uint32;
    using SafeMath for uint256;

    mapping(address => Entity) public entities;
    address owner;
    address payable fundingWallet;
    uint256 inflationTimestamp;
    
    // represents an entity, the current and the last rating
    struct Entity {
        string _name;
        mapping (string => Rating) _lastRatings;  // Not necessary for computations, but for evidence
        mapping (string => uint256) _currentRatings;
        mapping (string => uint256) _countRatings;
    }

    // represents one rating
    struct Rating {
        address _fromAddress;
        uint256 _rating;
    }
    
    // Constructor: Initializes values including reference to PiTrust token
    constructor(uint256 initialSupply) ERC20("PiTrust", "PIT") {
        owner = tx.origin;  // Safe the owner address
        inflationTimestamp = block.timestamp + 31536000;  // One year from now
        fundingWallet = payable(owner);

        _mint(msg.sender, initialSupply);  // First, all supply goes to the funding wallet
    }

    // Allow function only to be used by owner (set at initial transmission of the smart contract)
    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }

    // Inflate supply by 20% per year
    function inflation() internal {
        if (block.timestamp > inflationTimestamp) {
            _mint(fundingWallet, this.totalSupply()/5);
            inflationTimestamp += 31536000;  // plus one year
        }
    }

    // Transfer tokens based on rating
    function transferOnRating(address payable targetAddress, uint256 rating) public {
        // Deduct token from senders wallet and transfer part to wallet of of receiver
        // Send rest to fundingWallet
        transfer(targetAddress, rating -1);
        transfer(fundingWallet, 11 - rating);
        inflation();
    }

    // Core function: Rate an entity
    function rate(address payable targetAddress, string memory field, uint256 rating) public payable {
        // First: Check if rater has enough PiTrust tokens
        require(this.balanceOf(msg.sender) >= 10);

        // require rating between 1 and 10
        require(rating >= 1);
        require(rating <= 10);

        // Transfer tokens
        this.transferOnRating(targetAddress, rating);

        // Save current rating
        entities[targetAddress]._lastRatings[field] = Rating(msg.sender, rating);

        // Calculate new rating according to formula
        uint256 currentRating = entities[targetAddress]._currentRatings[field];
        uint256 currentCount = entities[targetAddress]._countRatings[field];
        // First implementation:
        // entities[_address]._currentRatings[_field] = (currentRating * currentCount + _rating) / (currentCount + 1);

        // Use SafeMath library

        // Refined implementation
        uint256 ratersRating = entities[msg.sender]._currentRatings[field];  // Get the rater's expertise
        uint256 newRating = (currentRating.mul(currentCount)
            .add(rating.mul(ratersRating.add(1))))
                .div(currentCount.add(1).mul(11));

        // Increment rating count for respective field
        entities[targetAddress]._countRatings[field] += 1;

        // Write new rating to target entity
        entities[targetAddress]._currentRatings[field] = newRating;
    }

    // get rating of a person in a particular field
    function getRating(address targetAddress, string memory field) public view returns(uint256) {
        return entities[targetAddress]._currentRatings[field];
    }
}