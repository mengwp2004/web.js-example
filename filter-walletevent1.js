
var Web3 = require('../index.js');
var BigNumber = require('bignumber.js');
var ethURL = 'http://localhost:8545';

web3 = new Web3(new Web3.providers.HttpProvider(ethURL));

var topics =[web3.sha3('Transfer(uint256,uint256,uint256)')];
//topics =[web3.sha3('Transfer(uint256,uint256)')];

console.log(topics);
//opics=[];
topics =["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"];
//topics =['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000005d860f37c1291707a806d302d10bc09705f2aa84', '0x000000000000000000000000dcdfb6944a6b3e070877b6f6c3fba28b205f259b']
//topics =['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', null]


var contract_address = "0x163fda28fea5356f051cc00e236d67006200b558";


var options = {fromBlock:2494,
               toBlock:2590,
               address:contract_address,
               topics:topics};
//var topics =["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"]

web3.eth.filter(options).get(function(error, result){
  if (!error)
    console.log(result);
  else
    console.log(error);
});



filter.watch(function (error, log) {
  console.log(log); //  {"address":"0x0000000000000000000000000000000000000000", "data":"0x0000000000000000000000000000000000000000000000000000000000000000", ..

});

/*console.log("filter get!");
// get all past logs again.
var myResults = filter.get(function(error, logs){ 
   console.log(logs);
});

filter.watch(function(error, result){
  if (!error)
    console.log(result);
});*/

