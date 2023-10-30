import { useState } from "react";

// A way of calculating the returned types of a function based on the input type
// either auto inference or specifying type yourself

export const Example = () => {
  const [state, setState] = useState<number>();

  setState(3);
};
