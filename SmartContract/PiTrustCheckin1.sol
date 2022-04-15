pragma solidity ^0.8.13;
// SPDX-License-Identifier: UNLICENSED

contract PiTrustToken {
    address owner;
    address payable fundingWallet;
    uint256 supply;
    uint256 inflationTimestamp;

    string public name;
    mapping(address => uint256) balances;

    // Allow function only to be used by owner (set at initial transmission of the smart contract)
    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = tx.origin;
        supply = 1000000000;
        inflationTimestamp = block.timestamp + 31536000;  // One year from now
        owner = tx.origin;
        fundingWallet = payable(owner);
    }

    function getBalance(address _address) view public returns (uint256) {
        return balances[_address];
    }

    function mint(address _wallet, uint256 _value) internal  {
        balances[_wallet] += _value;
    }

    // Inflate supply by 20% per year
    function inflation() internal {
        if (block.timestamp > inflationTimestamp) {
            mint(fundingWallet, supply/5);
            inflationTimestamp += 31536000;  // plus one year
        }
    }

    // Transfer tokens based on rating
    function transferOnRating(address payable _address, uint8 _rating) public {
        // Deduct token from senders wallet and transfer part to wallet of of receiver
        // Send rest to fundingWallet
        balances[tx.origin] -= 10;
        balances[_address] += _rating -1;
        balances[fundingWallet] += 11 - _rating;
        inflation();
    }
}



contract PiTrust {
    address owner;
    address public token;
    mapping(address => Entity) public entities;
    

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
    constructor(address _token) {
        owner = msg.sender;
        token = _token;
    }

    // Core function: Rate an entity
    function rate(address payable _address, string memory _field, uint8 _rating) public payable {
        // First: Check if rater has enough PiTrust tokens
        PiTrustToken _token = PiTrustToken(address(token));
        require(_token.getBalance(msg.sender) >= 10);

        // require rating between 1 and 10
        require(_rating >= 1);
        require(_rating <= 10);

        // Transfer token
        _token.transferOnRating(_address, _rating);

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
        // return entities[_address].ratings;
    }
}