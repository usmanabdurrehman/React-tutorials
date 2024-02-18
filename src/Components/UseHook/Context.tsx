import { createContext, use } from "react";

export const Context = () => {
  const context = createContext(0);
  const data = use(context);
};
