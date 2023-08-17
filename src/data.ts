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
  { id: 'decimal', num: '.' },
];

export const opObj = [
  { id: 'divide', op: '÷' },
  { id: 'multiply', op: '*' },
  { id: 'add', op: '+' },
  { id: 'subtract', op: '-' },
];


export const opArr = opObj.map((i) => i.op);


function ObjtoStr(obj) {
  let str = obj
    .map((x) => {
    /*  if (x === '*') {
        return '/' + x.op;
      } else {*/
        return x;
     // }
    })
    .join('');

  return str;
}


export function isOp(op){
if(opArr.findIndex(i => i === op) > -1){
  return true;
}
return false;
}

const opStr = ObjtoStr(opArr);
let regex1 = `[${opStr}]`;
//let regex2 = `([^\\d+]|[${opStr}])`;

let regex2 = `([^\\d+]|\\d+[\\.{0,1}]\\d+|[${opStr}])`;
//const regex1 =
//console.log(regex1)
export const opRegex = new RegExp(regex1, 'g');
export const regex = new RegExp(regex2, 'g');

console.log(opArr.map(i => i).findIndex(i => i =="÷"))

console.log("6*9+8".split(opRegex))
