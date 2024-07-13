import { faker } from "@faker-js/faker";
faker.seed(123);

export const users = Array.from({ length: 6 }, (_, i) => i).map((i) => {
  return {
    id: i,
    name: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
    avatar: faker.image.avatar(),
    age: faker.number.int({ max: 100, min: 1 }),
  };
});
