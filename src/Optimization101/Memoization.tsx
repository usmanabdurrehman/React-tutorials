import React, { useCallback, useMemo, useState } from "react";

const Card = React.memo(
  ({
    onClick,
    title,
    cardContent,
  }: {
    onClick?: () => void;
    title: string;
    cardContent?: string[];
  }) => {
    console.log("Card rerendered");
    return (
      <div
        onClick={onClick}
        style={{
          borderRadius: 4,
          padding: 10,
          boxShadow: "3px 3px 7px lightgray",
          margin: 12,
        }}
      >
        {title}
        {cardContent && (
          <ul>
            {cardContent?.map((content) => (
              <li>{content}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

export default function Memoization() {
  const [count, setCount] = useState(0);
  const cardContent = useMemo(() => ["Comment 1", "Comment 2"], []);
  const onClick = useCallback(() => {}, []);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Card title="Post 1" cardContent={cardContent} onClick={onClick} />
    </div>
  );
}
