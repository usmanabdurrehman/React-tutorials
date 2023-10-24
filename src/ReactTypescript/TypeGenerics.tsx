import { useState } from "react";

export const Example = () => {
  const [state, setState] = useState<number | undefined>();

  setState(2);
};
