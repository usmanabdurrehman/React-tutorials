import React, { useState } from "react";

export default function State() {
  const [count, setCount] = useState(1);
  return (
    <div>
      <p>{count ** 2}</p>
      <button
        onClick={() => {
          const newCount = count + 1;
          setCount(newCount);
        }}
      >
        {count}
      </button>
    </div>
  );
}
