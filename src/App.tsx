import * as React from 'react';
import { useState, useEffect } from 'react';
import { isOp, numObj, opArr, opObj, opRegex, regex } from './data';

import './style.css';

export default function App() {
  //const [firstNum, setFirstNum] = useState(0);
  const [totalNum, setTotalNum] = useState(0);
  //const [secNum, setSecNum] = useState(0);
  const [operation, setOperation] = useState(false);
  // const [currState, setCurrState] = useState([]);
  const [currState, setCurrState] = useState('');

  function setCalculatorState(num) {

    if((num === "0" && currState.length  <1) || (num === "0" && currState.length === 1 && currState[0] === "0")){
      return;
    }
    let currStat = '';

    //check if calculation was recently carried out, if yes , clear console and show new number
    if (operation) {
      currStat = '' + num;
    } else {
      currStat = currState + num;
    }
    try{
      let currArr = currStat.split(opRegex);


    let total = currArr[currArr.length - 1];

    setTotalNum(parseFloat(total));

    //false means a new calculation
    setOperation(false);
    setCurrState(currStat);
    }catch(err){
      console.error(err);
      return;
    }

    //split current state into array to get last number
    
  }

  const handleOp = (op) => {
if((op === "*" || op === "÷" || op === "+") && currState.length < 1 ){
      return;
    }    

let lastIndex = currState[currState.length - 1];
    if (opArr.findIndex(i => i == lastIndex) < 0) {
      let currStat = currState + op;
      setOperation(false);
      setCurrState(currStat);
    }

  };

  function clearCalc() {
    //setFirstNum(0);
   // setSecNum(0);
    setTotalNum(0);
    setOperation(false);
    //setCurrState([]);
    setCurrState('');
  }

  function clearOP(total) {
    //setFirstNum(0);
    setTotalNum(total);
    //setCurrState([total]);
    setCurrState(total.toString());
    //setSecNum(0);
    setOperation(true);
  }
  function calculateNum() {
    let first = 0;
    let second = 0;
    let op = '';
    let total = 0;

    try{
      let currArr = [...currState.split(regex).filter((i) => i !== '')];

    if (currArr[0] === '-') {
      let firstEl = currArr[0] + currArr[1];
      currArr.splice(0, 2);
      currArr.unshift(firstEl);
    }
    

    
    if(currArr.length <= 2){
      if(currArr.length === 1 ){
       
          total = parseFloat(currArr[0])
        
      }else{
        if(isOp(currArr[0])){
          let op = currArr[0];
          let num = currArr[1];

          if(op === "-" || op === "+"){
            total = op === "+" ? parseFloat(num) : parseFloat(op + num)
          }else{
            return;
          }

        }else{
          total = parseFloat(currArr[0])
        }
      }
    } else{
      //console.log(opAr, 'opAr');


    //opOrder[0][1] position in opAr , BODMAS inspired
    // or opOrder[0][2] pick index from calculator state
    //&& count < opOrder.length


    while (currArr.length > 2) {

      let opOrder = [];
      // update operations in current State Arr
      opArr.forEach((i, index) => {
        currArr.forEach((a, ind) => {
          if (i === a) {
            opOrder.push([i, index, ind]);
          }
        });

      });

    
      //check if an operator is in the operator array
      if (opArr.findIndex((y) => y === opOrder[0][0]) > -1) {
        let index = opOrder[0][2];

        op = opOrder[0][0];
        first = parseFloat(currArr[index - 1]);
        second = parseFloat(currArr[index + 1]);
        // console.log(op, first, second,index, "opfsec");


        if (op) {
          switch (op) {
            case '+':
              total = first + second;
              console.log(first + second, first, second, 'total');
              break;

            case '-':
              total = first - second;
              break;

            case '*':
              total = first * second;
              break;

            case '÷':
              total = first / second;
              break;
          }
          if (currArr.length >= 3) {

            currArr.splice(index - 1, 3, total.toString())
          }


          //currArr.unshift(total);
          // currArr.unshift(total.toString());
          
          op = '';
          second = 0;
        }
      }

    }

    }
    

    clearOP(+total.toFixed(12));
    }catch(error){
      console.log(error);
      return;
    }

    
  }

  useEffect(() => {
    setTotalNum(totalNum);
    setCurrState(currState);

    return () => {
      setTotalNum(0);
    };
  }, [currState, totalNum]);

  /**id="add", id="subtract", id="multiply", id="divide". */

  //console.log(currState, firstNum, secNum, totalNum);

  return (
    <div className="container">
      <div id="calculator">
        <div id="display">
          <p id="currState"> {currState}</p>
          <p id="totalNum">{totalNum}</p>
        </div>

        <div id="operatorPad">
          <div id="numPad">
            <div id="clear" onClick={() => clearCalc()}>
              Clear
            </div>
            {numObj.map((item, index) => {
              return (
                <div
                  key={index}
                  id={item.id}
                  className="num"
                  onClick={() => setCalculatorState(item.num.toString())}
                >
                  {item.num}
                </div>
              );
            })}
          </div>

          <div id="opsPad">
            {opObj.map((item, index) => {
              return (
                <div
                  key={index}
                  id={item.id}
                  className="ops"
                  onClick={() => handleOp(item.op)}
                >
                  {item.op}
                </div>
              );
            })}

            <div id="equal" className="ops" onClick={() => {
              if(currState.length > 0 && !isOp(currState)){
                calculateNum()
              }
            }}>
              {'='}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 *arr.find gives undefined or item
 * state 1st operand, operation, 2nd operand
 * check if current input state is zero
 * check if number has a decimal point before allowing
 * check if int to check for decimal point
 *
 * for negative no., check if operation is null
 *
 *
 *
 * add first then concatenate
 *
 *
 * TO- DO
 * what happens when i enter 2 operands
 */
