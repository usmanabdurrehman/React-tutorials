import { useQuery } from "react-query";

const sleep = (timer: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, timer);
  });

export const useColors = () => {
  return useQuery(["COLORS"], async () => {
    await sleep(5000);
    return [
      { id: 1, name: "Red", hex: "1" },
      { id: 2, name: "Green", hex: "1" },
      { id: 3, name: "Blue", hex: "1" },
    ];
  });
};
