#!/usr/bin/env node

var Web3 = require('../index.js');
//var Web3 = require("web3");


var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));


//var Web3 = require("web3");
// 创建web3对象
//var web3 = new Web3();
// 连接到以太坊节点
//web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));


//if (typeof web3 !== 'undefined') {
//  web3 = new Web3(web3.currentProvider);
//} else {
  // set the provider you want from Web3.providers
//var   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//}
var version = web3.version.api;
console.log(version); // "0.2.0"


// 合约ABI

var abi = '[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"registrantsPaid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"organizer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"quota","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numRegistrants","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Refund","type":"event"},{"constant":false,"inputs":[],"name":"buyTicket","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newquota","type":"uint256"}],"name":"changeQuota","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"refundTicket","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]';

console.log(abi.toString())
var abi1 = [{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"}];
// 合约地址
var address = "06455fa488bf37b961510728aae30d318c4ab579";

abi =JSON.parse(abi);
// 通过ABI和地址获取已部署的合约对象
var metacoin = web3.eth.contract(abi).at(address);


var account_one = web3.eth.accounts[0];
console.log(account_one)
//var account_one_balance = metacoin.buyTicket();
//console.log("buy ticket: ", account_one_balance.toNumber());
console.log(account_one)

var numR =metacoin.numRegistrants;
console.log(numR)
var num = web3.eth.blockNumber
console.log(num)

//var result1=web3.personal.newAccount('mwp1');
//console.log(result1);


var integer=web3.ethGetBalance("0x445eF3961a305C27597736C194b2AeE48f945A4b",DefaultBlockParameterName.LATEST).send().getBalance();



//获取指定钱包的指定币种余额

value=web3.ethCall(Transaction.createEthCallTransaction("0x445eF3961a305C27597736C194b2AeE48f945A4b","0x163fda28fea5356f051cc00e236d67006200b558", ""),DefaultBlockParameterName.PENDING).send().getValue();

//交易串的获取应该是这么做的 这么做的话需要去阅读以太坊源码 并找到方法的名称

//所以我直接写死了"0x70a08231000000000000000000000000cb1bf954b73031918a58f001c3c3e7fb66daaf7c"

//前边几位是固定写死的 后边的cb1bf954b73031918a58f001c3c3e7fb66daaf7c 是要查询余额的钱包地址   只需要替换下

//地址就可以了
/*
Function function = new Function(
        "查询余额方法名称",
        Arrays.asList(new Address(“钱包地址”)),
        Arrays.asList(new TypeReference<Address>(){})
);
交易串= FunctionEncoder.encode(function);

 

//获取NONCE
EthGetTransactionCount ethGetTransactionCount = web3j.ethGetTransactionCount(
        fromAddress, DefaultBlockParameterName.LATEST).sendAsync().get();
//交易的发起者在之前进行过的交易数量
BigInteger nonce = ethGetTransactionCount.getTransactionCount();

//创建交易  注意金额 保留小数点后8位 要转化为整数 比如0.00000001 转化为1
Function function = new Function(
        "transfer",//交易的方法名称  
        Arrays.asList(new Address("收款钱包地址"),new Uint256("金额")),
        Arrays.asList(new TypeReference<Address>(){},new TypeReference<Uint256>(){})
);
String encodedFunction = FunctionEncoder.encode(function);
//智能合约事物
RawTransaction rawTransaction = RawTransaction.createTransaction(nonce, Constants.GAS_PRICE, Constants.GAS_LIMIT,"代币地址",encodedFunction);
//通过私钥获取凭证  当然也可以根据其他的获取 其他方式详情请看web3j
Credentials credentials = Credentials.create("私钥");

byte[] signedMessage = TransactionEncoder.signMessage(rawTransaction, credentials);
String hexValue = Numeric.toHexString(signedMessage);
//发送事务
EthSendTransaction ethSendTransaction = web3j.ethSendRawTransaction(hexValue).sendAsync().get();
//事物的HASH
String transactionHash = ethSendTransaction.getTransactionHash();

*/
