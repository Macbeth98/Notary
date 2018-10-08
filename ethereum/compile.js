const path = require('path'); //cross platform compatibiolity
const fs = require('fs');
const solc = require('solc');

const notaryPath = path.resolve(__dirname, 'contracts', 'Notary.sol');
const source = fs.readFileSync(notaryPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Notary'];
