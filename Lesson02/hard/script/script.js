let num = 266219;
let numb = num.toString().split('');
let numb2 = numb.map(parseFloat);
let res = 1;

console.log(numb);
console.log(numb2);

for (let i = 0; i<6; i++)
{
  res *= numb2[i];
}
console.log(res);
res = res ** 3;     //2176782336

// console.log(res);
console.log(String(res).slice(0,2));