import React, { use } from "react";

// https://jsonplaceholder.typicode.com/users

const timeout = (numSeconds: number) =>
  new Promise((resolve, reject) => setTimeout(resolve, numSeconds));

const promise = new Promise(async (resolve) => {
  await timeout(4000);
  resolve("123");
});

export default function UseHook() {
  const users = use(promise);

  return <div>{JSON.stringify(users)}</div>;
}
