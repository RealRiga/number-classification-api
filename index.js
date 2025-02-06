require('dotenv').config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Function to check if a number is prime
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Function to check if a number is perfect
const isPerfect = (num) => {
  let sum = 1;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      sum += i;
      if (i !== num / i) sum += num / i;
    }
  }
  return sum === num && num !== 1;
};

// Function to check if a number is an Armstrong number
const isArmstrong = (num) => {
  const digits = num.toString().split("").map(Number);
  const power = digits.length;
  const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
  return sum === num;
};

// Function to get the sum of digits of a number
const getDigitSum = (num) =>
  num
    .toString()
    .split("")
    .reduce((acc, digit) => acc + parseInt(digit), 0);

// API Endpoint
app.get("/api/classify-number", async (req, res) => {
  const { number } = req.query;

  // Input validation
  if (!number || isNaN(number) || !Number.isInteger(Number(number))) {
    return res.status(400).json({ number, error: true });
  }

  const num = parseInt(number);
  const prime = isPrime(num);
  const perfect = isPerfect(num);
  const armstrong = isArmstrong(num);
  const digitSum = getDigitSum(num);
  const parity = num % 2 === 0 ? "even" : "odd";

  // Determine properties array
  let properties = [];
  if (armstrong) {
    properties.push("armstrong");
  }
  properties.push(parity);

  // this ensure properties are in the correct order
  if (properties.length === 1) {
    properties = [properties[0]];
  }

  // Fetch fun fact from Numbers API
  let funFact = "";
  try {
    const response = await axios.get(`http://numbersapi.com/${num}/math`);
    funFact = response.data;
    if (funFact.includes("we're missing a fact")) {
        funFact = "No specific fun fact available for this number.";
    }
  } catch (error) {
    funFact = "Fun fact unavailable due to API issue.";
  }

  // Send response
  res.json({
    number: num,
    is_prime: prime,
    is_perfect: perfect,
    properties,
    digit_sum: digitSum,
    fun_fact: funFact,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
