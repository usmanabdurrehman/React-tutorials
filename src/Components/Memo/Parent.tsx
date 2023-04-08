import React, { useCallback, useMemo, useState } from "react";
import { Memoized } from "./Memoized";

export const MemoizedParent = () => {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);

  const onChange = useCallback((newValue: string) => setValue(newValue), []);
  const inputVal = `$ ${value}`;
  const options = useMemo(() => new Array(value.length).fill(""), [value]);

  const showButton = count < 10;

  return (
    <>
      <Memoized onChange={onChange} value={inputVal} options={options} />
      {showButton && (
        <button onClick={() => setCount(count + 1)}>{count}</button>
      )}
    </>
  );
};
