import React, { useCallback, useMemo, useState } from "react";

const allComments = [
  { personId: 1, comment: "Comment 1" },
  { personId: 2, comment: "Comment 2" },
  { personId: 1, comment: "Comment 3" },
];

const Card = React.memo(
  ({
    onClick,
    title,
    comments,
  }: {
    onClick?: () => void;
    title: string;
    comments?: string[];
  }) => {
    console.log("Card rerendered");
    return (
      <div
        style={{
          borderRadius: 4,
          padding: 10,
          boxShadow: "3px 3px 7px lightgray",
          margin: 12,
        }}
      >
        {title}
        {comments && (
          <ul>
            {comments?.map((comment) => (
              <li>{comment}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

/*
PreRequisties

1. Dont wrap everything with useMemo
   Only use it if the component being rerendered is heavy or heavy calculation
   Memoization requires memory usage

2. Dont use useMemo for values which arent calculated from some prop/value
   Move them outside the component so that their reference remains the same

3. Dont use useMemo for simple types(string, boolean, numbers) that arent calculated because of a complex calculation
   Could have used if was being yielded by a caluclation done on an array of 10k items lets say

4. Dont, keep arrays and objects as is inside the component
*/

export default function Memoization() {
  const [count, setCount] = useState(0);
  const [id] = useState(1);

  const COMEMNT_LIMIT = 5;
  const comments = useMemo(() => ["Comment 1", "Comment 2"], []);

  const commentsById = useMemo(
    () => allComments.map(({ personId }) => personId === id),
    [id]
  );

  const cardContentLength = useMemo(() => comments?.length, []);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Card title="Post 1" comments={comments} />
      No of Comments: {cardContentLength}
    </div>
  );
}
