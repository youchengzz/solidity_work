// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BeggingContract {
    mapping(address => uint256) private donator;
    uint256 public total;
    address public owner;
    // 捐赠排行榜
    uint constant MAXRANK = 3;
    address[MAXRANK] private rankList;

    // 时间限制
    uint256 constant LOCKTIME = 60;
    uint256 timestamp;

    constructor() {
        owner = msg.sender;
        timestamp = block.timestamp;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "is not owner");
        _;
    }

    event Donation(address indexed donateAddress, uint256 amount);

    function donate() public payable {
        // require((timestamp + LOCKTIME) > block.timestamp, "is not time to donate");
        require(msg.value > 0, "send value need greater then 0");
        donator[msg.sender] += msg.value;
        total += msg.value;
        setRankList(msg.sender, donator[msg.sender]);
        emit Donation(msg.sender, msg.value);
    } 

    function withdraw(uint256 amount) public onlyOwner {
        require(total > 0, "total is null");
        require(total >= amount, "total is not enough");
        total -= amount;
        payable(msg.sender).transfer(amount);
    }

    function getDonation(address donatorAddress) public view returns(uint256) {
        return donator[donatorAddress];
    }

    function setRankList(address donateAddress, uint256 amount) internal {
        if (rankList[0] == address(0)) {
            rankList[0] = donateAddress;
            return;
        }
        uint index = MAXRANK;
        for (uint i = 0; i < MAXRANK; i++) {
            address tmp = rankList[i];
            // 确定插入位置
            if (tmp == address(0) || amount > donator[tmp]) {
                index = i;
                break;
            }
        }
        // 如果需要插入且位置有效
        if (index < MAXRANK) {
            if (rankList[index] == donateAddress) {
                return;
            }
            for (uint z = MAXRANK - 1; z > index; z--) {
                if (rankList[z - 1] == donateAddress) {
                    rankList[z] = address(0);
                    continue;
                }
                rankList[z] = rankList[z - 1];
            }
            // 插入新元素
            rankList[index] = donateAddress;
        }
        
    }

    function getRankList() public view returns(address[3] memory) {
        return rankList;
    }
}