import React from "react";

function Button({
  makeRequestOnDoubleClick,
  hideModalOnDoubleClick,
  text,
}: {
  makeRequestOnDoubleClick?: boolean;
  hideModalOnDoubleClick?: boolean;
  text: string;
}) {
  const doubleClickHandler = async () => {
    await fetch("http://localhost:7000");
  };

  return (
    <button
      onDoubleClick={makeRequestOnDoubleClick ? doubleClickHandler : undefined}
    >
      {text}
    </button>
  );
}

export const Component1 = () => {
  return <Button text={"Click me"} makeRequestOnDoubleClick />;
};
