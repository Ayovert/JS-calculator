import * as React from 'react';
import { useState, useEffect } from 'react';
import { numObj, ObjtoStr, opArr, regex } from './data';

import './style.css';

export default function App() {
  const [firstNum, setFirstNum] = useState(0);
  const [totalNum, setTotalNum] = useState(0);
  const [secNum, setSecNum] = useState(0);
  const [operation, setOperation] = useState(false);
  // const [currState, setCurrState] = useState([]);
  const [currState, setCurrState] = useState('');

  

  function setCalculatorState(num) {
    let currStat = currState + num;
    /*let currArr = [];
    currArr.push(...currState);
    //currArr.push(num);

    let first = firstNum.toString();
    if (!operation) {
      currArr = [];

      num = parseFloat(first + num.toString());
      setFirstNum(num);
      currArr.push(num);
    } else {
      num = parseFloat(secNum.toString() + num.toString());
      setSecNum(num);
      currArr[currArr.length] = num;

      //setCurrState(`${firstNum + " "+operation +" " + num}`);
    }

    setTotalNum(currArr[currArr.length - 1]);
    setCurrState(currArr);
    //setOperation("")*/

    let currArr = currStat.split(/[+]/);

    let total = currArr[currArr.length - 1];
    setTotalNum(parseFloat(total));

    setCurrState(currStat);
  }

  const handleOp = (op) => {
    /* let currArr = [];
    currArr.push(...currState);

    if (currArr[0] !== undefined) {
      setFirstNum(currArr[0]);
    }
    currArr.push(op);

    setCurrState(currArr);
    setOperation(op);*/

    let currStat = currState + op;
    setCurrState(currStat);
  };

  function clearCalc() {
    setFirstNum(0);
    setSecNum(0);
    setTotalNum(0);
    setOperation(false);
    //setCurrState([]);
    setCurrState('');
  }

  function clearOP(total) {
    setFirstNum(0);
    setTotalNum(total);
    //setCurrState([total]);
    setCurrState(total.toString());
    setSecNum(0);
    setOperation(false);
  }
  function calculateNum() {
    let first = 0;
    let second = 0;
    let op = '';
    //let currArr = [...currState];

   // let currArr = [...currState.split(/([^\d+]|[+-])/g)];

   
   
  // let currArr = [...currState.split(/([^\d+]|[+-])/g)];
  let currArr = [...currState.split("")];
    console.log(currArr, 'curr');
    let total = 0;

    ///[+-/*]+/
    ///\w+|./g

    ///(?<=[ +])/

    //i-1 i i +1
    while (currArr.length > 2) {
      //check if an operator is in the array
      if (currArr.find((x) => opArr.find((y) => y.op === x)) !== undefined) {
        let index = currArr.findIndex((x) => opArr.find((y) => y.op === x));

        op = currArr.find((x) => opArr.find((y) => y.op === x));
        first = parseFloat(currArr[index - 1]);
        second = parseFloat(currArr[index + 1]);
      }

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
          currArr = currArr.slice(3);
        }

        console.log(currArr, 'curX');
        //currArr.unshift(total);
        currArr.unshift(total.toString());
        op = '';
        second = 0;
      }
    }

    clearOP(total);
  }

  

  useEffect(() => {
    setTotalNum(totalNum);
    setCurrState(currState);

    return () => {
      setTotalNum(0);
    };
  }, [currState, totalNum]);

  /**id="add", id="subtract", id="multiply", id="divide". */

  console.log(currState, firstNum, secNum, totalNum);


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
            {opArr.map((item, index) => {
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

            <div id="equal" className="ops" onClick={() => calculateNum()}>
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
 */


