import * as React from 'react';
import { useState, useEffect } from 'react';
import numArr, { numObj } from './data';

import './style.css';

export default function App() {
  const [firstNum, setFirstNum] = useState(0);
  const [totalNum, setTotalNum] = useState(0);
  const [secNum, setSecNum] = useState(0);
  const [operation, setOperation] = useState('');
  const [currState, setCurrState] = useState([]);

  function setCalculatorState(num) {
    let currArr = [];
    currArr.push(...currState);
    //currArr.push(num);

    let first = firstNum.toString();
    if (!operation) {
      currArr = [];

      num = parseFloat(first + num.toString());
      setFirstNum(num);
    } else {
      num = parseFloat(secNum.toString() + num.toString());
      setSecNum(num);

      //setCurrState(`${firstNum + " "+operation +" " + num}`);
    }

    currArr.push(num);

    setTotalNum(currArr[currArr.length - 1]);
    setCurrState(currArr);
  }

  const handleOp = (op) => {
    let currArr = [];
    currArr.push(...currState);
    if (currArr[0] !== undefined) {
      setFirstNum(currArr[0]);
    }
    currArr.push(op);

    setCurrState(currArr);
    setOperation(op);
  };

  function clearCalc() {
    setFirstNum(0);
    setSecNum(0);
    setTotalNum(0);
    setOperation('');
    setCurrState([]);
  }

  function clearOP(total) {
    setFirstNum(0);
    setTotalNum(total);
    setCurrState([total]);
    setSecNum(0);
    setOperation('');
  }
  function calculateNum() {
    let total = 0;
    if (operation) {
      switch (operation) {
        case '+':
          total = firstNum + secNum;
          console.log(firstNum + secNum, firstNum, secNum, 'total');
          break;

        case '-':
          total = firstNum - secNum;
          break;

        case '*':
          total = firstNum * secNum;
          break;

        case '÷':
          total = firstNum / secNum;
          break;
      }
      clearOP(total);
    }
  }

  const opArr = [
    { id: 'add', op: '+' },
    { id: 'subtract', op: '-' },
    { id: 'multiply', op: '*' },
    { id: 'divide', op: '÷' },
  ];

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
                  onClick={() => setCalculatorState(item.num)}
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
 *
 * state 1st operand, operation, 2nd operand
 * check if current input state is zero
 * check if number has a decimal point before allowing
 * check if int to check for decimal point
 *
 * for negative no., check if operation is null
 *
 */
