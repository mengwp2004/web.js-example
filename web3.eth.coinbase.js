var chai = require('chai');
var assert = chai.assert;
var Web3 = require('../index');
var web3 = new Web3();
var FakeHttpProvider = require('./helpers/FakeHttpProvider');

var method = 'coinbase';

var tests = [{
    result: '0x47d33b27bb249a2dbab4c0612bf9caf4c1950855',
    formattedResult: '0x47d33b27bb249a2dbab4c0612bf9caf4c1950855',
    call: 'eth_'+ method
}];

                
                // given
                var provider = new FakeHttpProvider();
                web3.setProvider(provider);
                // when 
                var result = web3.eth[method];
                
                // then
                console.log(result)
