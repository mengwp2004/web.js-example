
var Web3 = require('../index.js');
var BigNumber = require('bignumber.js');
var ethURL = 'http://localhost:8545';

web3 = new Web3(new Web3.providers.HttpProvider(ethURL));

web3.eth.getBlock(910, function(error, result){
    if(!error)
        console.log(JSON.stringify(result));
    else
        console.error(error);
})
