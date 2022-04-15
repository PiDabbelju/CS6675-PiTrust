pragma solidity ^0.8.13;
// SPDX-License-Identifier: UNLICENSED

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PiTrust is ERC20 {
    mapping(address => Entity) public entities;
    address owner;
    address payable fundingWallet;
    uint256 inflationTimestamp;
    
    // represents an entity, the current and the last rating
    struct Entity {
        string _name;
        mapping (string => Rating) _lastRatings;  // Not necessary for computations, but for evidence
        mapping (string => uint128) _currentRatings;
        mapping (string => uint128) _countRatings;
    }

    // represents one rating
    struct Rating {
        address _fromAddress;
        uint8 _rating;
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
    function transferOnRating(address payable targetAddress, uint8 rating) public {
        // Deduct token from senders wallet and transfer part to wallet of of receiver
        // Send rest to fundingWallet
        transfer(targetAddress, rating -1);
        transfer(fundingWallet, 11 - rating);
        inflation();
    }

    // Core function: Rate an entity
    function rate(address payable _address, string memory _field, uint8 _rating) public payable {
        // First: Check if rater has enough PiTrust tokens
        require(this.balanceOf(msg.sender) >= 10);

        // require rating between 1 and 10
        require(_rating >= 1);
        require(_rating <= 10);

        // Transfer token
        this.transferOnRating(_address, _rating);

        // Save current rating
        entities[_address]._lastRatings[_field] = Rating(msg.sender, _rating);

        // Calculate new rating according to formula
        uint128 currentRating = entities[_address]._currentRatings[_field];
        uint128 currentCount = entities[_address]._countRatings[_field];
        entities[_address]._currentRatings[_field] = (currentRating * currentCount + _rating) / (currentCount + 1);

        // Increment rating count for respective field
        entities[_address]._countRatings[_field] += 1;
    }

    // get rating of a person in a particular field
    function getRating(address _address, string memory _field) public view returns(uint128) {
        return entities[_address]._currentRatings[_field];
    }
}