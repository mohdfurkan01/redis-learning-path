function generate10DigitNumber() {
  // Math.random() generates a decimal between 0 (inclusive) and 1 (exclusive).
  // Multiplying by 9,000,000,000 and adding 1,000,000,000 ensures the result
  // is always exactly 10 digits long and never starts with a zero.
  const min = 1000000000;
  const max = 9000000000;

  const randomNumber = Math.floor(Math.random() * max) + min;
  return randomNumber;
}

// Call the function and print the result
console.log("Your random 10-digit number is:", generate10DigitNumber());
