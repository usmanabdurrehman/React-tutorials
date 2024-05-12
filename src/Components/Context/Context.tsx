import { createContext, use } from "react";

const Context = createContext(0);

export const Child = () => {
  const data = use(Context);

  return null;
};

export const App = () => {
  return (
    <Context value={1}>
      <Child />
    </Context>
  );
};
