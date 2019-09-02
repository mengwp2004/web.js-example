pragma solidity ^0.4.24;

/**
 * @title ERC20Basic
 * @dev Simpler version of ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/179
 */
contract ERC20Basic {
  uint256 public totalSupply;
  function balanceOf(address who) public view returns (uint256);
  function transfer(address to, uint256 value) public returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
}

/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b);
    return c;
  }

  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;
  }

  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}

/**
 * @title Basic token
 * @dev Basic version of StandardToken, with no allowances.
 */
contract BasicToken is ERC20Basic {
  using SafeMath for uint256;

  mapping(address => uint256) balances;

  /**
  * @dev transfer token for a specified address
  * @param _to The address to transfer to.
  * @param _value The amount to be transferred.
  */
  function transfer(address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balances[msg.sender]);

    // SafeMath.sub will throw if there is not enough balance.
    balances[msg.sender] = balances[msg.sender].sub(_value);
    balances[_to] = balances[_to].add(_value);
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  /**
  * @dev Gets the balance of the specified address.
  * @param _owner The address to query the the balance of.
  * @return An uint256 representing the amount owned by the passed address.
  */
  function balanceOf(address _owner) public view returns (uint256 balance) {
    return balances[_owner];
  }

}

/**
 * @title ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
contract ERC20 is ERC20Basic {
  function allowance(address owner, address spender) public view returns (uint256);
  function transferFrom(address from, address to, uint256 value) public returns (bool);
  function approve(address spender, uint256 value) public returns (bool);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

/**
 * @title Standard ERC20 token
 *
 * @dev Implementation of the basic standard token.
 * @dev https://github.com/ethereum/EIPs/issues/20
 * @dev Based on code by FirstBlood: https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol
 */
contract StandardToken is ERC20, BasicToken {

  mapping (address => mapping (address => uint256)) internal allowed;


  /**
   * @dev Transfer tokens from one address to another
   * @param _from address The address which you want to send tokens from
   * @param _to address The address which you want to transfer to
   * @param _value uint256 the amount of tokens to be transferred
   */
  function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balances[_from]);
    require(_value <= allowed[_from][msg.sender]);

    balances[_from] = balances[_from].sub(_value);
    balances[_to] = balances[_to].add(_value);
    allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
    emit Transfer(_from, _to, _value);
    return true;
  }
  

  

  /**
   * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
   *
   * Beware that changing an allowance with this method brings the risk that someone may use both the old
   * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
   * race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:
   * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
   * @param _spender The address which will spend the funds.
   * @param _value The amount of tokens to be spent.
   */
  function approve(address _spender, uint256 _value) public returns (bool) {
    require((_value == 0) || (allowed[msg.sender][_spender] == 0));
    allowed[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  /**
   * @dev Function to check the amount of tokens that an owner allowed to a spender.
   * @param _owner address The address which owns the funds.
   * @param _spender address The address which will spend the funds.
   * @return A uint256 specifying the amount of tokens still available for the spender.
   */
  function allowance(address _owner, address _spender) public view returns (uint256) {
    return allowed[_owner][_spender];
  }

  /**
   * @dev Increase the amount of tokens that an owner allowed to a spender.
   *
   * approve should be called when allowed[_spender] == 0. To increment
   * allowed value is better to use this function to avoid 2 calls (and wait until
   * the first transaction is mined)
   * From MonolithDAO Token.sol
   * @param _spender The address which will spend the funds.
   * @param _addedValue The amount of tokens to increase the allowance by.
   */
  function increaseApproval(address _spender, uint _addedValue) public returns (bool) {
    allowed[msg.sender][_spender] = allowed[msg.sender][_spender].add(_addedValue);
    emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
    return true;
  }

  /**
   * @dev Decrease the amount of tokens that an owner allowed to a spender.
   *
   * approve should be called when allowed[_spender] == 0. To decrement
   * allowed value is better to use this function to avoid 2 calls (and wait until
   * the first transaction is mined)
   * From MonolithDAO Token.sol
   * @param _spender The address which will spend the funds.
   * @param _subtractedValue The amount of tokens to decrease the allowance by.
   */
  function decreaseApproval(address _spender, uint _subtractedValue) public returns (bool) {
    uint oldValue = allowed[msg.sender][_spender];
    if (_subtractedValue > oldValue) {
      allowed[msg.sender][_spender] = 0;
    } else {
      allowed[msg.sender][_spender] = oldValue.sub(_subtractedValue);
    }
    emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
    return true;
  }

}

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
  address public owner;


  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  constructor() public {
    owner = msg.sender;
  }


  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }


  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0));
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

}

/**
 * @title Mintable token
 * @dev Simple ERC20 Token example, with mintable token creation
 * @dev Issue: * https://github.com/OpenZeppelin/zeppelin-solidity/issues/120
 * Based on code by TokenMarketNet: https://github.com/TokenMarketNet/ico/blob/master/contracts/MintableToken.sol
 */

contract MintableToken is StandardToken, Ownable {
  event Mint(address indexed to, uint256 amount);
  event MintFinished();

  bool public mintingFinished = false;


  modifier canMint() {
    require(!mintingFinished);
    _;
  }

  /**
   * @dev Function to mint tokens
   * @param _to The address that will receive the minted tokens.
   * @param _amount The amount of tokens to mint.
   * @return A boolean that indicates if the operation was successful.
   */
  function mint(address _to, uint256 _amount) onlyOwner canMint public returns (bool) {
    totalSupply = totalSupply.add(_amount);
    balances[_to] = balances[_to].add(_amount);
    emit Mint(_to, _amount);
    emit Transfer(address(0), _to, _amount);
    return true;
  }

  /**
   * @dev Function to stop minting new tokens.
   * @return True if the operation was successful.
   */
  function finishMinting() onlyOwner canMint public returns (bool) {
    mintingFinished = true;
    emit MintFinished();
    return true;
  }
}

contract DetailedERC20 is ERC20 {
  string public name;
  string public symbol;
  uint8 public decimals;

  constructor(string _name, string _symbol, uint8 _decimals) public {
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
  }
}

/**
 * @title Capped token
 * @dev Mintable token with a token cap.
 */

contract CappedToken is MintableToken {

  uint256 public cap;

  constructor(uint256 _cap) public {
    require(_cap > 0);
    cap = _cap;
  }

  /**
   * @dev Function to mint tokens
   * @param _to The address that will receive the minted tokens.
   * @param _amount The amount of tokens to mint.
   * @return A boolean that indicates if the operation was successful.
   */
  function mint(address _to, uint256 _amount) onlyOwner canMint public returns (bool) {
    require(totalSupply.add(_amount) <= cap);

    return super.mint(_to, _amount);
  }

}

/**
 * @title Burnable Token
 * @dev Token that can be irreversibly burned (destroyed).
 */
contract BurnableToken is BasicToken {

    event Burn(address indexed burner, uint256 value);

    /**
     * @dev Burns a specific amount of tokens.
     * @param _value The amount of token to be burned.
     */
    function burn(uint256 _value) public {
        require(_value <= balances[msg.sender]);
        // no need to require value <= totalSupply, since that would imply the
        // sender's balance is greater than the totalSupply, which *should* be an assertion failure

        address burner = msg.sender;
        balances[burner] = balances[burner].sub(_value);
        totalSupply = totalSupply.sub(_value);
        emit Burn(burner, _value);
    }
}



interface ChildToken {
    function transfer(address _to, uint256 _value)  public  returns (bool);
    function balanceOf(address _owner) public view returns (uint256 balance);
    function getRedeemRecord(address from) public view returns(uint256 value);
}

contract GustoChildToken is ChildToken {

    using SafeMath for uint256;
    ChildToken childToken;
    constructor(address contractAddress) public{
  	  childToken = ChildToken(contractAddress);
    }

}


contract GustoMainToken is CappedToken, BurnableToken, DetailedERC20 {

    using SafeMath for uint256;

    uint8 constant DECIMALS = 18;
    uint  constant TOTALTOKEN = 10 * 10 ** (9 + uint(DECIMALS));
    string constant NAME = "GUSTO Token";
    string constant SYM = "GUSTO";
   
    event IssueToken(string name,string symbol,uint total,uint8 decimals,uint256 mainHold);
    event Redeem(address from,string symbol,uint256 value);
    event Pledge(address from,string symbol,uint256 value);
 
    struct TokenRelation
    {
        string  symbol;
        uint256 mainHold;
        uint256 subIssue;
        uint256 currentMainHold;
        uint256 currentSubIssue; 
        GustoChildToken childToken;
        bool    issued;
        
    }
    
    struct TokenRecord {
        uint256 mValue;
        uint256 cValue;
    }
    mapping(string => TokenRelation) tokenRelations;
    mapping(string => mapping( address =>TokenRecord)) tokenRecords;
    
    constructor() CappedToken(TOTALTOKEN) DetailedERC20 (NAME, SYM, DECIMALS) public {
        
        balances[msg.sender] = TOTALTOKEN;
        totalSupply = totalSupply.add(TOTALTOKEN);
        //stokenRelations['GDM'] = TokenRelation("GDM",1000,1000,1000,1000,GustoChildToken(0),true);
    }

    function issueToken(string name,string symbol,uint total,uint8 decimals,uint256 mainHold,address contractAddress) onlyOwner public returns(bool) {
        require(
            balances[msg.sender] >= mainHold,
            "balance must >= mainHold."
        );
        
        TokenRelation storage tokenRelation = tokenRelations[symbol];
        require(!tokenRelation.issued ,"exist symbol");
        GustoChildToken sub = GustoChildToken(contractAddress);

        tokenRelations[symbol] = TokenRelation(symbol,mainHold,total,mainHold,total,sub,true);
        emit IssueToken(name,symbol,total,decimals,mainHold);
        return true;
    }

    function getRelation(string symbol)  public view  returns (string sym,uint256 mainHold,uint256 subIssue,uint256 currentMainHold,uint256 currentSubIssue,address contractAddress) {
        TokenRelation storage tokenRelation = tokenRelations[symbol];
        require(tokenRelation.issued ,"not exist symbol");
        sym = tokenRelation.symbol;
        mainHold = tokenRelation.mainHold;
        subIssue = tokenRelation.subIssue;
        currentMainHold = tokenRelation.currentMainHold;
        currentSubIssue = tokenRelation.currentSubIssue;
        contractAddress = tokenRelation.childToken;
    }

   function getDefaultRelation(string symbol)  public view  returns (uint256) {
                TokenRelation storage tokenRelation = tokenRelations[symbol];
        require(tokenRelation.issued ,"not exist symbol");
        return tokenRelation.mainHold;
    }
    
    function getChildBalance(string symbol) public view returns (uint) {
        //check address and value
        //通过address获取对应的tokenRelation,然后减少对应的子币，加对应的主币

        TokenRelation storage tokenRelation = tokenRelations[symbol];
        require(tokenRelation.issued ,"not exist symbol");
        
        address _from  = msg.sender;
        GustoChildToken sub = tokenRelation.childToken; 
        //sub.transfer(owner,value); 
        return sub.balanceOf(_from);

    }
    
    function getChildRedeem(string symbol) public view returns (uint256) {
        //check address and value
        //通过address获取对应的tokenRelation,然后减少对应的子币，加对应的主币

        TokenRelation storage tokenRelation = tokenRelations[symbol];
        require(tokenRelation.issued ,"not exist symbol");
        
        address _from  = msg.sender;
        GustoChildToken sub = tokenRelation.childToken; 

        return sub.getRedeemRecord(_from);
    }
    
    function redeem(string symbol) public returns (bool) {
        //check address and value
        //通过address获取对应的tokenRelation,然后减少对应的子币，加对应的主币
        
        
        TokenRelation storage tokenRelation = tokenRelations[symbol];
        require(tokenRelation.issued ,"not exist symbol");
        
        address _to  = msg.sender;
        require(_to != address(0));
        GustoChildToken sub = tokenRelation.childToken; 
        
        uint256 value = sub.getRedeemRecord(_to);
        require(value > 0,"child redeem value equal 0!");
        TokenRecord storage tokenRecord = tokenRecords[symbol][_to];
        uint256 mValue = childToMainToken(symbol,value);
        if(tokenRecord.mValue >= mValue){
            return false;
        }
        uint256 _value = mValue.sub(tokenRecord.mValue);
        address _from = owner;
        require(_value <= balances[_from]);
    
        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);
        tokenRecords[symbol][_to] = TokenRecord(mValue,value);
        
        emit Redeem(_from,symbol,value);
        return true;
    }


    function mainToChildToken(string symbol,uint256 value) public returns(uint256){
        
        return value;
    }
    
    function childToMainToken(string symbol,uint256 value) public returns(uint256){
        return value;
    } 
  
    function pledge(string symbol,uint256 value) public returns (bool){
        //check address and value
        TokenRelation storage tokenRelation = tokenRelations[symbol];
        
        address _from  = msg.sender;
        //通过address获取对应的tokenRelation,然后减少对应的主币，加对应的子币
        
        transfer(owner,value);
        TokenRecord storage tokenRecord = tokenRecords[symbol][_from];
        uint256 _value = value.add(tokenRecord.mValue);
        
        uint256 _cValue = mainToChildToken(symbol,_value);
        tokenRecords[symbol][_from] = TokenRecord(_value,_cValue);
        
        emit Pledge(_from,symbol,value);
        return true;
    } 
    
    function getPledgeRecord(string symbol) public view returns(uint256 value){
        TokenRecord storage tokenRecord = tokenRecords[symbol][msg.sender];
        return  tokenRecord.cValue;
    }
}

