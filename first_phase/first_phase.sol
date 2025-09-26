// SPDX-License-Identifier: MIT
pragma solidity ^0.8;


// 投票
contract Voting {
    struct Vote {
        uint256 votes;
        uint8 version;
    }
    // 候选人票数
    mapping(address => Vote) public candidateVotes;
    // 已投票
    mapping(address => bool) private votedPerson;
    uint8 public version;

    // 投票
    function vote(address candidate) public  {
        require(!votedPerson[msg.sender], "You have already voted");
        votedPerson[msg.sender] = true;
        candidateVotes[candidate].votes += 1;
        candidateVotes[candidate].version = version;
    }

    // 获取候选人票数
    function getVotes(address candidate) public view returns(uint256){
        if (candidateVotes[candidate].version == version) {
            return candidateVotes[candidate].votes;
        }
        return 0;
    }

    // 重置候选人票数
    function resetVotes() public {
        version++;
    }
}


// 反转字符串
contract Reversal {
    function reversalString(string memory str) public pure returns(string memory) {
        bytes memory s = bytes(str);
        bytes memory res = new bytes(s.length);
        for (uint i=0; i < s.length; i++) {
            res[s.length - 1 - i] = s[i];
        }
        return string(res);
    }
}

contract Roman {
    mapping(bytes1 => uint) private dict;
    constructor() {
        dict["I"] = 1;
        dict["V"] = 5;
        dict["X"] = 10;
        dict["L"] = 50;
        dict["C"] = 100;
        dict["D"] = 500;
        dict["M"] = 1000;
    }
    function romanToInt(string memory str) public view returns(uint) {
        bytes memory s = bytes(str);
        uint res = 0;
        uint previous = 0;
        for (uint i = s.length; i > 0; i--) {
            uint tmp = dict[s[i - 1]];
            if (previous <= tmp) {
                res = tmp + res;
            } else {
                res = res - tmp;
            }
            previous = tmp;
        }
        return res;
    }
    function intToRoman(uint num) public pure returns(string memory){
        return "";
    }
}