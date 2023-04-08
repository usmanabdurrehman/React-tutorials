import React from "react";

interface MemoizedProps {
  onChange: (e: string) => void;
  value: string;
  options: string[];
}

export const Memoized = React.memo(({ onChange, value }: MemoizedProps) => {
  return (
    <input
      onChange={(e) => onChange(e.target.value.replace("$", "").trim())}
      value={value}
    />
  );
});
