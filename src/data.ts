import { User } from "./types";

import { faker } from "@faker-js/faker";

faker.seed(124);

export function createRandomUser(): User {
  return {
    userId: faker.string.uuid(),
    name: faker.internet.displayName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthDate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
  count: 1000,
});
