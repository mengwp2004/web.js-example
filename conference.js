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

