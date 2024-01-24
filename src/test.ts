import { TypeChecker } from "./index";

const obj = {
  name: "John",
  post: "asdf",
  age: 20,
  address: {
    street: "1234",
    city: "New York",
    state: "NY",
    zip: 12345,
  },
  // nationality: "American",
  hobbies: ["asdf"],
};
const startTime = process.hrtime();
const objChecker = new TypeChecker(obj);
const result = objChecker
  .is(["name", "post"])
  .as("string")
  .is("age")
  .as("number")
  .is(["nationality", "hobbies"])
  .as(["array", "undefined"])
  .is("hobbies")
  .as("array")
  .end();
const addressChecker = new TypeChecker(obj.address);
const result2 = addressChecker
  .is(["street", "city", "state"])
  .as("string")
  .is("zip")
  .as("number")
  .end();
const endTime =
  process.hrtime(startTime).reduce((acc, curr) => acc * 1000 + curr, 0) /
  1000000;
console.log(endTime);
console.log(result); // true
console.log(result2); // true
