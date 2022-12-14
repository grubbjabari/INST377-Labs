const array = [1,2,3,4,5,6];

function multiplyByTwo(x) {
  return x + 2;
}

const twoFer = array.map((item,idx) => multiplyByTwo(item))
const newFer = array.filter((item, idx) => item%3===0)

/* 
Replace loops with single lines for code to become cleaner
*/