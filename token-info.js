/**
 * This utility module helps to demonstrate following features
 * a. Signing a message by an Ethereum user
 * b. Finding the account address using which the message was signed
 */
var Web3 = require('../index.js');
var ethURL = ""; 
var defaultAc = "0x5D860F37C1291707A806D302D10Bc09705F2Aa84"; //"0x7903ab827918f2b8fde8656c65f4211b2f87ff7a"; 
var defaultAcPWD="123456"; 
var signatureContractCodeReadable="\n\tcontract SignatureVerifier {\n\t\tfunction verify( bytes32 hash, uint8 v, bytes32 r, bytes32 s) \n"+ 
    "\t\tconstant returns(address returnAddress) {\n \t\t\treturnAddress = ecrecover(hash, v, r, s);\n\t\t}\n\t}\n\n";

var sigContractInstance = null;
var sigContractAddress= "0x163fda28FeA5356F051CC00e236d67006200B558"; 
var sigContractInstance = null;
var strAbi1='[{"constant":true,"inputs":[{"name":"hash","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"verify","outputs":[{"name":"returnAddress","type":"address"}],"payable":false,"type":"function"}]';

var strAbi2='[{"constant":false,"inputs":[],"name":"sayHello","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]'

var strAbi='[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]'
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
        defaultAc=ethWeb3.eth.accounts[0];
        console.log(defaultAc)
      }
      accountsList = ethWeb3.eth.accounts;
      console.log(accountsList)
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
    //console.log(sigContractInstance)
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

function getBalance(){
 
    //if(ethWeb3.isConnected()==false){
    //    return false;
    //}
    initializeContract();
    var hello =sigContractInstance.balanceOf("0x5D860F37C1291707A806D302D10Bc09705F2Aa84");
    console.log("balance:" +hello);

    hello =sigContractInstance.balanceOf("0x445eF3961a305C27597736C194b2AeE48f945A4b");
    console.log(" 0x445eF3961a305C27597736C194b2AeE48f945A4b balance:" +hello);

}

function transfer(){
    //var bSuccess = sigContractInstance.transfer("0x7638D182d9cB6E0C32F4e8C0be44e2Cb290eb376",10000);
    //debugger;
    //var bSuccess = sigContractInstance.transfer.call("0x445eF3961a305C27597736C194b2AeE48f945A4b",10000);
    var state=unlockAccount(defaultAc);

    var bSuccess = sigContractInstance.transfer.sendTransaction("0x445eF3961a305C27597736C194b2AeE48f945A4b",10000,{from:defaultAc});
    console.log("transfer result:" + bSuccess)   

}

function totalSupply(){
 
    //if(ethWeb3.isConnected()==false){
    //    return false;
    //}
    initializeContract();
    var hello =sigContractInstance.totalSupply.call();
    console.log("totalSupply:" + hello);
   
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
    getBalance();
    totalSupply();
    transfer();
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
setEthereumURL('http://localhost:8545');

// Value 5- If required please update with a Ethereum URL
setMessage('This the test sign message');


execute();
