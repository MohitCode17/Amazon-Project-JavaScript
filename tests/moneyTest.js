import { formatMoney } from "../utils/formatMoney.js";

console.log("test suite: formatMoney");

console.log("Converts cents into dollars");

if (formatMoney(2894) === "28.94") {
  console.log("Passed");
} else {
  console.log("Failed");
}

console.log("Works with 0");
if (formatMoney(0) === "0.00") {
  console.log("Passed");
} else {
  console.log("Failed");
}

console.log("Rounds up to the nearest cent");
if (formatMoney(2000.5) === "20.01") {
  console.log("Passed");
} else {
  console.log("Failed");
}
