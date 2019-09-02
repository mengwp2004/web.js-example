
var Web3 = require('../index.js');
//var BigNumber = require('bignumber.js');
var BigNumber = require("big-integer");
var mysql = require('mysql'); 

var ethURL = 'http://localhost:8545';
var TEST_DATABASE = 'peatio_production'; 
var TEST_TABLE = 'members'; 


web3 = new Web3(new Web3.providers.HttpProvider(ethURL));

var contractAddress = "0x163fda28fea5356f051cc00e236d67006200b558";

var topics =["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"]

var options = {'fromBlock':2440,'toBlock':"latest",'address':contractAddress,'topics':topics};

var option ='pending';

var filter = web3.eth.filter(options);

function connectSql(){
  //创建连接 
  var client = mysql.createConnection({ 
  user: 'root', 
  password: 'mengwp_2004', 
  }); 
  client.connect();
  client.query("use " + TEST_DATABASE);
  return client;
}


function queryRecord(client){
   client.query('SELECT * FROM '+TEST_TABLE, 
     function selectCb(err, results, fields) { 
       if (err) { 
          throw err; 
       } 

       if(results)
       {
          for(var i = 0; i < results.length; i++)
          {
              console.log("%d\t%s\t%s", results[i].id, results[i].name, results[i].age);
          }
      }   
    client.end(); 
  });
}

client = connectSql();
queryRecord(client);

filter.watch(function (error, log) {
   process(log);
});


/*
{ address: '0x163fda28fea5356f051cc00e236d67006200b558',
  topics: 
   [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
     '0x000000000000000000000000c3aadccf55b41d80d3792ee55af7316aee2ea5ab',
     '0x000000000000000000000000c517bffddc672b05804062031d21058d50519110' ],
  data: '0x0000000000000000000000000000000000000000000000000000000000001387',
  blockNumber: 3581,
  transactionHash: '0x94d0797ae517cda26053a2df5a7904674e9e1e6b3dc0c850ec06ba8b0aaa71e6',
  transactionIndex: 0,
  blockHash: '0xa8654b7f6d9d364dd7b834aad6216c8ccdd6f7e1f895a3bd35521b6bc3332387',
  logIndex: 0,
  removed: false }

*/
function process(log){
  console.log("------------"); 
  if(log){ 
   
    //console.log(log); //  {"address":"0x0000000000000000000000000000000000000000", "data":"0x0000000000000000000000000000000000000000000000000000000000000000", ..
    blocknum = log.blockNumber;
    txHash = log.transactionHash;
    txTopics = log.topics;
    from = txTopics[1];
    from = from.substring(0,2) + from.substring(26);
    to = txTopics[2];
    to = to.substring(0,2,) + to.substring(26);
    data  = log.data.substring(2);
    data = new BigNumber(data,16);    
    //console.log(txHash,from,to,data);

    //get transaction
    var transaction = web3.eth.getTransaction(txHash);
    //console.log("tx info:" ,transaction);
/*
tx info: { blockHash: '0xa8654b7f6d9d364dd7b834aad6216c8ccdd6f7e1f895a3bd35521b6bc3332387',
  blockNumber: 3581,
  from: '0xc3aadccf55b41d80d3792ee55af7316aee2ea5ab',
  gas: 4300000,
  gasPrice: BigNumber { s: 1, e: 10, c: [ 22000000000 ] },
  hash: '0x94d0797ae517cda26053a2df5a7904674e9e1e6b3dc0c850ec06ba8b0aaa71e6',
  input: '0xa9059cbb000000000000000000000000c517bffddc672b05804062031d21058d505191100000000000000000000000000000000000000000000000000000000000001387',
  nonce: 80,
  to: '0x163fda28fea5356f051cc00e236d67006200b558',
  transactionIndex: 0,
  value: BigNumber { s: 1, e: 0, c: [ 0 ] },
  v: '0x1b',
  r: '0x432ac9ef6e261bcb47fc095681be6d3cd06d57d3a64c7a8f7b458c228984a2c',
  s: '0x75ebb604c4171950d3709ab9976b63ba412e88bf70dabc6f4fd428269d40837e' }

*/
    var bDeposit =false;
    var bWithdraw = false;
    var fromTotal = new BigNumber(0);
    var toTotal = new BigNumber(0);
    var eventInfo = "";
    var eventArgs = "";
    //read from db

    if(transaction.from != from){
       bDeposit = true;
       console.log("deposit",bDeposit);
       fromTotal = fromTotal.add(data);
       eventInfo = "TransferFrom";
       eventArgs = "";
       
    }else if(transaction.from == from){
       bWithdraw = true;
       console.log("withdraw",bWithdraw);
       toTotal = toTotal.add(data);
       eventInfo = "Transfer";
       eventArgs = "";
    }
        
   //write database
   console.log(blocknum,txHash,eventInfo,eventArgs,from,to,data,fromTotal,toTotal);
   

  }else{
    console.log("not find event!")
  }
}
