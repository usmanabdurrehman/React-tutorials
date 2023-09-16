import React, { useState } from "react";

export default function State() {
  const [count, setCount] = useState(1);
  const [squaredCount, setSquaredCount] = useState(1);
  return (
    <div>
      <p>{squaredCount}</p>
      <button
        onClick={() => {
          const newCount = count + 1;
          setSquaredCount(newCount ** 2);
          setCount(newCount);
        }}
      >
        {count}
      </button>
    </div>
  );
}
