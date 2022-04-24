pragma solidity ^0.8.6;
// SPDX-License-Identifier: UNLICENSED

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol"; 

contract PiTrust is ERC20 {
    using SafeMath for uint32;
    using SafeMath for uint256;

    mapping(address => Entity) public entities;
    mapping(string => Topic) public topics;
    address owner;
    address payable fundingWallet;
    uint256 inflationTimestamp;
    uint256 constant ratingMultiplier = 10000;
    uint256 constant inflationInterval = 31536000;  // one year

    // represents an entity, the its rating metrics
    struct Entity {
        string _name;
        string[] _topics;
        mapping (string => Rating) _lastRatings;  // Not necessary for computations, but for evidence
        mapping (string => uint256) _currentRatings;
        mapping (string => uint256) _countRatings;
    }

    // represents one rating
    struct Rating {
        address _fromAddress;
        uint256 _rating;
    }

    // represents a topic and an index of all rated entities
    struct Topic {
        string _name;
        address[] _entities;
    }
    
    // Constructor: Initializes values including reference to PiTrust token
    constructor(uint256 initialSupply) ERC20("PiTrust", "PT") {
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
            inflationTimestamp += inflationInterval;
        }
    }

    // Transfer tokens based on rating
    function transferOnRating(address targetAddress, uint256 rating) public {
        // Deduct token from senders wallet and transfer part to wallet of of receiver
        // Send rest to fundingWallet
        transferFrom(tx.origin, targetAddress, rating -1);
        transferFrom(tx.origin, fundingWallet, 11 - rating);
        inflation();
    }

    // Core function: Rate an entity
    function rate(address targetAddress, string memory field, uint256 rating) public payable returns(uint256) {
        // First: Check if rater has enough PiTrust tokens
        require(this.balanceOf(msg.sender) >= 10);

        // require rating between 1 and 10
        require(rating >= 1);
        require(rating <= 10);

        // Transfer tokens
        this.transferOnRating(targetAddress, rating);

        // Add topic to entities-array and entity to topics-array, if not already existing
        if (entities[targetAddress]._currentRatings[field] == 0) {
            entities[targetAddress]._topics.push(field);
            topics[field]._entities.push(targetAddress);
        }

        // Save current rating
        entities[targetAddress]._lastRatings[field] = Rating(msg.sender, rating);

        // Calculate new rating according to formula
        uint256 currentRating = entities[targetAddress]._currentRatings[field];
        uint256 currentCount = entities[targetAddress]._countRatings[field];
        // First implementation:
        // uint256 newRating = (currentRating * currentCount + rating) / (currentCount + 1);

        // Refined implementation
        uint256 ratersRating = max(ratingMultiplier, entities[msg.sender]._currentRatings[field]);  // Get the rater's expertise, 0 if not existent
        // Use SafeMath library
        uint256 newRating = (((currentRating.mul(currentCount))
           .add(rating.mul(ratersRating))).mul(ratingMultiplier))
               .div((currentCount.mul(ratingMultiplier)).add(ratersRating));

        // Increment rating count for respective field
        entities[targetAddress]._countRatings[field] += 1;

        // Write new rating to target entity
        entities[targetAddress]._currentRatings[field] = newRating;

        return newRating;
    }

    // get rating of an entity in a particular field (has to be divided by ratingMultiplier for the actual rating )
    function getRating(address targetAddress, string memory field) public view returns(uint256) {
        return entities[targetAddress]._currentRatings[field]; // / ratingMultiplier;
    }

    // add 1000 tokens to a wallet
    function addFunds(address targetAddress) public ownerOnly {
        _mint(targetAddress, 1000);
    }

    // get all topics with ratings of an entity
    function getAllTopics(address targetAddress) public view returns(string[] memory) {
        return entities[targetAddress]._topics;
    }

    // get all entities with ratings on a particular topic
    function getEntities(string memory topic) public view returns(address[] memory) {
        return topics[topic]._entities;
    }

    // Helper function to return maximum of two values
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a >= b ? a : b;
    }
}