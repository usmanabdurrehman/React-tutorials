import { faker } from "@faker-js/faker";

export type Person = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
};

const newPerson = (index: number): Person => {
  return {
    id: index + 1,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(40),
  };
};

export const makeData = (length: number) =>
  new Array(length).fill("_").map((_, index): Person => newPerson(index));
