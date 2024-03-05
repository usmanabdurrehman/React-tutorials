import React from "react";

function Button({
  onDoubleClick,
  text,
}: {
  onDoubleClick?: () => void;
  text: string;
}) {
  return <button onDoubleClick={onDoubleClick}>{text}</button>;
}

export const Component1 = () => {
  return (
    <Button
      text={"Click me"}
      onDoubleClick={async () => {
        await fetch("http://localhost:7000");
      }}
    />
  );
};

export const Component2 = () => {
  return <Button text={"Click me"} onDoubleClick={() => {}} />;
};
