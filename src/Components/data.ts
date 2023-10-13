import { faker } from "@faker-js/faker";
faker.seed(123);

interface User {
  id: string;
  avatar: string;
  birthday: Date;
  email: string;
  firstName: string;
  lastName: string;
  sex: string;
}

function createRandomUser(): User {
  return {
    id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    sex: faker.person.sexType(),
  };
}

export const users = Array(4)
  .fill(undefined)
  .map((i) => createRandomUser());
