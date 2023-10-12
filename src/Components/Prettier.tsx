const name = "James";

const person = { first: name };

console.log(person);

const sayHelloLinting = (fName: string) => {
  console.log(`Hello linting, ${fName}`);
};

sayHelloLinting("James");
