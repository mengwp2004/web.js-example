
var Web3 = require('../index.js');
var BigNumber = require('bignumber.js');
var ethURL = 'http://localhost:8545';

web3 = new Web3(new Web3.providers.HttpProvider(ethURL));

var contract_address = "0x163fda28fea5356f051cc00e236d67006200b558";

var topics =["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"]
var options = {fromBlock:2494,toBlock:3590,address:contract_address,topics:topics};

var filter = web3.eth.filter(options);

console.log("filter get!");
// get all past logs again.
var myResults = filter.get(function(error, logs){ 
   console.log(logs);
});


