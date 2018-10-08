pragma solidity ^0.4.24;

contract Notary {

    struct MyNotaryEntry {
        string filename;
        uint timestamp;
        bytes32 hash;
        string comments;
        bool isSet;
        address setBy;
    }

    mapping(bytes32 => MyNotaryEntry) public myMap;

    event NewEntry(bytes32 _hash, string _filename, address indexed _setBy);

    function addEntry(bytes32 _hash, string _filename, string _comments) public {
        require(!myMap[_hash].isSet);

        myMap[_hash].filename = _filename;
        myMap[_hash].timestamp = now;
        myMap[_hash].hash = _hash;
        myMap[_hash].comments = _comments;
        myMap[_hash].isSet = true;
        myMap[_hash].setBy = msg.sender;

        emit NewEntry(_hash ,_filename, msg.sender);
    }

    function entrySet(bytes32 _hash) public view returns(string, uint, string, address) {
        require(myMap[_hash].isSet);

        return (myMap[_hash].filename, myMap[_hash].timestamp, myMap[_hash].comments, myMap[_hash].setBy);
    }
}
