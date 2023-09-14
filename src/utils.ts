export const timeout = (numSeconds: number) =>
  new Promise((resolve, reject) => setTimeout(resolve, numSeconds));
