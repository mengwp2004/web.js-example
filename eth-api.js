
var Web3 = require('web3');
var BigNumber = require('bignumber.js');
var ip = '192.168.50.7';
var ethURL = 'http://' + ip + ':8545';

web3 = new Web3(new Web3.providers.HttpProvider(ethURL));

//for hash
var hash = web3.sha3("Some string to be hashed");
console.log(hash);
var hashOfHash = web3.sha3(hash, {encoding: 'hex'});
console.log(hashOfHash);

//for toHex
var str = "abcABC";
var obj = {abc: 'ABC'};
var bignumber = new BigNumber('12345678901234567890');


var hstr = web3.toHex(str);
var hobj = web3.toHex(obj);
var hbg = web3.toHex(bignumber);

console.log("Hex of Sring:" + hstr);
console.log("Hex of Object:" + hobj);
console.log("Hex of BigNumber:" + hbg);

//toAscii
var str = web3.toAscii("0x657468657265756d000000000000000000000000000000000000000000000000");
console.log(str); // "ethereum"

var value = web3.toWei('1', 'ether');
console.log(value); // "1000000000000000000"


var listening = web3.net.listening;
console.log("client listening: " + listening);

var peerCount = web3.net.peerCount;
console.log("Peer count: " + peerCount);

console.log("Current default: " + web3.eth.defaultAccount);

console.log("defaultBlock: " + web3.eth.defaultBlock);

var sync = web3.eth.syncing;
console.log(sync);

var coinbase = web3.eth.coinbase;
console.log(coinbase);

var hashrate = web3.eth.hashrate;
console.log(hashrate);

var accounts = web3.eth.accounts;
console.log(accounts);


var number = web3.eth.blockNumber;
console.log(number); // 2744

var balance = web3.eth.getBalance(web3.eth.accounts[0]);
console.log(balance); // instanceof BigNumber
console.log(balance.toString(10)); // '1000000000000'
console.log(balance.toNumber()); // 1000000000000

var contract_address = "0x163fda28fea5356f051cc00e236d67006200b558";

var state = web3.eth.getStorageAt("0x163fda28fea5356f051cc00e236d67006200b558", 0);
console.log(state); // "0x03"

var code = web3.eth.getCode(contract_address);
console.log(code);


var info = web3.eth.getBlock(3150);
console.log(info);


var number = web3.eth.getBlockTransactionCount("0xdabc6af99f71cde64e19220a3192a1ab05bd663dd0e83081ffa6706605daef16");
console.log(number); 

var uncle = web3.eth.getUncle(500, 0);
console.log(uncle); // see web3.eth.getBlock

var blockNumber = 910;
var indexOfTransaction = 0

var transaction = web3.eth.getTransaction("0x3bd0df7e12b61cd1956fcd5ed699782e533b05a221ef95b4e7358d2b3e78c799");
console.log(transaction);

var transaction = web3.eth.getTransactionFromBlock(910, 0);
console.log(transaction); // see web3.eth.getTransaction

var txhash= "0x3bd0df7e12b61cd1956fcd5ed699782e533b05a221ef95b4e7358d2b3e78c799";
var receipt = web3.eth.getTransactionReceipt(txhash);
console.log(receipt);


//var code = "603d80600c6000396000f3007c01000000000000000000000000000000000000000000000000000000006000350463c6888fa18114602d57005b6007600435028060005260206000f3";

//web3.eth.sendTransaction({data: code}, function(err, address) {
//  if (!err)
//    console.log(address); // "0x7f9fade1c0d57a7af66ab4ead7c2eb7b11a91385"
//});




