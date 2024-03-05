import React from "react";

export const getButtonStyles = (size: "xs" | "s" | "m", variant: string) => {
  return { height: 40, width: 40 };
};

export default function Button({
  text,
  variant,
  size,
  onClick,
}: {
  text: string;
  variant: string;
  size: "xs" | "s" | "m";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  showTooltip?: boolean;
  showTooltipAfterDelay?: boolean;
  hideTooltipAfterThreeSeconds?: boolean;
  runAngularOnClick?: boolean;
}) {
  // Run Angular On Click

  // Hide Tooltip After 3 Seconds logic

  // Show Tooltip After Delay logic

  // Show Tooltip logic

  return (
    <button onClick={onClick} style={{ ...getButtonStyles(size, variant) }}>
      {text}
    </button>
  );
}
