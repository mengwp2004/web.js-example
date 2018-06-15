/**
 * This utility module helps to demonstrate following features
 * a. Signing a message by an Ethereum user
 * b. Finding the account address using which the message was signed
 */
var Web3 = require('../index.js');
var BigNumber = require('bignumber.js');
var ethURL = ""; 
var defaultAc = "0x7903ab827918f2b8fde8656c65f4211b2f87ff7a"; 
var defaultAcPWD="123456"; 
var signatureContractCodeReadable="\n\tcontract SignatureVerifier {\n\t\tfunction verify( bytes32 hash, uint8 v, bytes32 r, bytes32 s) \n"+ 
    "\t\tconstant returns(address returnAddress) {\n \t\t\treturnAddress = ecrecover(hash, v, r, s);\n\t\t}\n\t}\n\n";

var sigContractInstance = null;
var sigContractAddress= "0xb0ef6921c69aed893845b26b9bfba9e81629763d"; 
var sigContractInstance = null;
var strAbi100='[{"constant":true,"inputs":[{"name":"hash","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"verify","outputs":[{"name":"returnAddress","type":"address"}],"payable":false,"type":"function"}]';

var strAbi='[{"constant":false,"inputs":[],"name":"sayHello","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]'


var sigContractAddress1 = "0x9ac62fd8f910197677395e7b8e4845c1eceee3b2"; 
var strAbi1='[{"constant":false,"inputs":[{"name":"_value","type":"int256"}],"name":"foo","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"int256"}],"name":"ReturnValue","type":"event"}]';


var signMessage=""; 

var ethWeb3 = null;

function setContractAddress(conAddress){
    sigContractAddress = conAddress;
}

function setAccount(act){
    defaultAc = act;
}

function setPassword(pwd){
    defaultAcPWD = pwd;
}

function setEthereumURL(url){
    ethURL = url;
}

function setMessage(msg){
    signMessage = msg;
}

function initializeEthereumConnection(){
   if(ethWeb3!=null && ethWeb3.isConnected()==true)  {
    return true;
  }
  
  ethWeb3 = new Web3(new Web3.providers.HttpProvider(ethURL));
  
  if(ethWeb3.isConnected()==true){
      if(defaultAc==''){
        defaultAc=ethWeb3.eth.accounts[1];
      }
      return true;
  }

  return false;
}

function unlockAccount(acAddress){
  if(acAddress!=undefined && acAddress!=null){
    var state=ethWeb3.personal.unlockAccount(defaultAc, defaultAcPWD, 100);
    return state;
  }

  return false; 
}


function initializeContract(){
    initializeEthereumConnection();
    if(ethWeb3.isConnected()==false){
        return;
    }  
    var abi = JSON.parse(strAbi);
    var contract = ethWeb3.eth.contract(abi);

    sigContractInstance =  contract.at(sigContractAddress) 

    abi = JSON.parse(strAbi1);
    contract = ethWeb3.eth.contract(abi);


    exampleContract = contract.at(sigContractAddress1) 
 
}

function signMessage(message){

    initializeEthereumConnection();
    if(ethWeb3.isConnected()==false){
        return false;
    }
    
    var state=unlockAccount(defaultAc);
    
    const msg = new Buffer(message);
    const sig = ethWeb3.eth.sign(defaultAc, '0x' + msg.toString('hex'));

    return sig;
}

function verifySignedByAc(message, sig){
    initializeEthereumConnection();

    if(ethWeb3.isConnected()==false){
        return false;
    }
    initializeContract();

    const res = splitSig(sig);

    // Unfortunately Geth client adds this line to the message as a prefix while signing
    // So while finding who signed it we need to prefix this part 
    const prefix = new Buffer("\x19Ethereum Signed Message:\n");
    const msg = new Buffer(message);
    const prefixedMsg = ethWeb3.sha3(
    Buffer.concat([prefix, new Buffer(String(msg.length)), msg]).toString('utf8')
    );

    var strPrefixedMsg=prefixedMsg;

    var finalAddress=sigContractInstance.verify.call(strPrefixedMsg, res.v, res.r, '0x'+ res.s);

    return finalAddress;
}

function splitSig(sig) {
  return {
    v: ethWeb3.toDecimal('0x' + sig.slice(130, 132)),
    r: sig.slice(0, 66),
    s: sig.slice(66, 130)
  }

}

function sign(){
    var message = document.getElementById('txtMessage').value;
    var signMsg = signMessage(message);
    document.getElementById('dvSig').innerText = signMsg;
}

function verify(){
    var message = document.getElementById('txtMessage').value;
    var actAddr = verifySignedByAc(message, document.getElementById('dvSig').innerText);
    document.getElementById('dvSignedBy').innerText = actAddr;
}


function execute(){
    console.log("\n\n**********************************************************************");
    console.log("Steps to Run");
    console.log("**********************************************************************");
    console.log("1. Deploy the following contract in your ethereum environment");
    console.log(signatureContractCodeReadable);
    console.log("2. Set the following parameters (i.e. at the end of the code)");
    console.log("\ta. Ethereum URL");
    console.log("\tb. Ethereum Account Address");
    console.log("\tc. Ethereum Account Passphrase");
    console.log("\td. Signature Contract Address");
    console.log("\te. Message for signing");
    console.log("**********************************************************************");

    if(ethURL==''){
        console.log("Error: Ethereum URL is not specified");
        return;
    }
    if(defaultAc==''){
        console.log("Error: Account Address is not specified");
        return;
    }
    if(defaultAcPWD==''){
        console.log("Error: Account password is not specified");
        return;
    }
    if(sigContractAddress==''){
        console.log("Error: Signature Contract Address is not specified");
        return;
    }
    if(signMessage==''){
        console.log("Error: Message for signing is not specified");
        return;
    }
    

    console.log("Following parameters applied");
    console.log("\ta. Ethereum URL                  :",ethURL);
    console.log("\tb. Ethereum Account Address      :",defaultAc);
    console.log("\tc. Ethereum Account Passphrase   :",defaultAcPWD);
    console.log("\td. Signature Contract Address    :",sigContractAddress);
    console.log("\te. Message for signing           :",signMessage);

    console.log("**********************************************************************");
    console.log("Result");
    console.log("**********************************************************************");

    //var sig=signMessage(signMessage);
    //console.log("Signature");
    //console.log(sig);

    //var addr=verifySignedByAc(signMessage, sig);
    //console.log("Signed By");
    //console.log(addr);
    console.log("Hi:")

    console.log("**********************************************************************");
    console.log("Exit");
    console.log("**********************************************************************");
}

// Please uncomment the below listed three lines of code and provide the required values

// Value 1- Please provide the ethereum account address which you want to use to perform the operation
//setAccount('<Provide the account address>');

// Value 2- Please provide the password of the accound to be used 
//setPassword('<Provide the password>');

// Value 3- Please update the address of the contract after deployment
// The contract code is made available at the top under signatureContractCodeReadable variable
// Please deploy the contract and update the contract address here
//setContractAddress('<Provide the deployed contract address>');

// Value 4- If required please update with a different message
setEthereumURL('http://localhost:7545');

// Value 5- If required please update with a Ethereum URL
setMessage('This the test sign message');


execute();

//以下是web3.js用户客户端代码
/*var exampleEvent = exampleContract.ReturnValue({_from: ethWeb3.eth.coinbase});

exampleEvent.watch(function(err, result) {
  if (err) {
    console.log(err)
    return;
  }
  console.log(result.args._value)
  // check that result.args._from is web3.eth.coinbase then
  // display result.args._value in the UI and call    
  // exampleEvent.stopWatching()
})
exampleContract.foo.sendTransaction(2, {from: ethWeb3.eth.coinbase})*/

if(initializeEthereumConnection()){
  console.log("connect error!");
  return;
}
var web3 = ethWeb3
//var version = ethWeb3.getProtocolVersion.call();
//console.log(version);

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

