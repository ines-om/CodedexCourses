let die1 = Math.floor(Math.random() * 6) + 1;
let die2 = Math.floor(Math.random() * 6) + 1;

let numberOfRolls = 0;

while (die1 !== die2) {
  console.log("Roll 1: " + die1);
  console.log("Roll 2: " + die2);
  numberOfRolls++;

  // Roll again
  die1 = Math.floor(Math.random() * 6) + 1;
  die2 = Math.floor(Math.random() * 6) + 1;
}

// Final matching roll (the one that breaks the loop)
console.log("Roll 1: " + die1);
console.log("Roll 2: " + die2);
console.log("Number of rolls: " + numberOfRolls);
