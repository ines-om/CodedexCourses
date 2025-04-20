
let limit = 7;

let total = 0;

for (let i=1; i<=limit; i++) {
  if(i%2!=0) {
    total = total + i*i*i;
  }
}

console.log(total);