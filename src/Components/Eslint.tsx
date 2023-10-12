import { useCallback, useEffect, useState } from "react";

// npx eslint --init

const profession = "teacher";

const Component = () => {
  const [count, setCount] = useState(0);
  if (profession) {
  }
  const onCountChange = useCallback(() => {
    console.log("count", count);
  }, []);
};
