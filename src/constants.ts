import { faker } from "@faker-js/faker";

faker.seed(123);

export const names = Array(500000)
  .fill("_")
  .map((i, index) => ({ name: faker.person.fullName(), id: index }));
