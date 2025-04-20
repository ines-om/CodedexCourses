// Write code below 💖

let firstFib = 0;
let secondFib = 1;

console.log(firstFib);
console.log(secondFib);


for (let i=2; i<10; i++) {
  let nextFib = firstFib + secondFib;
  console.log(nextFib);
  firstFib = secondFib;
  secondFib = nextFib;
}