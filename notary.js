import web3 from './web3';

const address = '0xe4bbc3bFA35329653F0d8F245E81444cE1fd239A';

const abi = [
  {
    constant: true,
    inputs: [{ name: '_hash', type: 'bytes32' }],
    name: 'entrySet',
    outputs: [
      { name: '', type: 'string' },
      { name: '', type: 'uint256' },
      { name: '', type: 'string' },
      { name: '', type: 'address' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_hash', type: 'bytes32' },
      { name: '_filename', type: 'string' },
      { name: '_comments', type: 'string' }
    ],
    name: 'addEntry',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'bytes32' }],
    name: 'myMap',
    outputs: [
      { name: 'filename', type: 'string' },
      { name: 'timestamp', type: 'uint256' },
      { name: 'hash', type: 'bytes32' },
      { name: 'comments', type: 'string' },
      { name: 'isSet', type: 'bool' },
      { name: 'setBy', type: 'address' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: '_hash', type: 'bytes32' },
      { indexed: false, name: '_filename', type: 'string' },
      { indexed: true, name: '_setBy', type: 'address' }
    ],
    name: 'NewEntry',
    type: 'event'
  }
];

export default new web3.eth.Contract(abi, address);
