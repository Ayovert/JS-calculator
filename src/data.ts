let numArrx = [];

numArrx = Array.from(Array(10).keys());

numArrx.push(0);
numArrx.push('.');

const numArr = numArrx;
//export numArr;

export const numObj = [
  { id: 'one', num: 1 },
  { id: 'two', num: 2 },
  { id: 'three', num: 3 },
  { id: 'four', num: 4 },
  { id: 'five', num: 5 },
  { id: 'six', num: 6 },
  { id: 'seven', num: 7 },
  { id: 'eight', num: 8 },
  { id: 'nine', num: 9 },
  { id: 'zero', num: 0 },
  { id: 'decimal', num: '.' }
];

export const opArr = [
  { id: 'add', op: '+' },
  { id: 'subtract', op: '-' },
  { id: 'multiply', op: '*' },
  { id: 'divide', op: '÷' }
];

function ObjtoStr(obj) {
  let str = obj
    .map((x) => {
      if (x.op === '*') {
        return '/' + x.op;
      } else {
        return x.op;
      }
    })
    .join('');

  let regex = `([^\d+]|[${str}])`;

  

  return regex;
}
let regex1 = ObjtoStr(opArr);
//console.log(regex1)

//export const regex  = new RegExp("^" + "(abc)"+"$", "g");


export const regex  = `/${regex1}/`


console.log(regex,"reg")



