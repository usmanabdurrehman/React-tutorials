import React from "react";

const Card = React.memo(({ onClick }: { onClick: () => void }) => {
  return <div onClick={onClick}></div>;
});

export default function Memoization() {
  return <Card onClick={() => {}} />;
}
