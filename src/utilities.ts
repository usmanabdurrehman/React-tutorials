const addDelay = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });

export const addTodo = async (message: string) => {
  await addDelay();
  console.log(`${message} todo added to db`);
};
