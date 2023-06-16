import React from "react";
import { useRanger } from "react-ranger";

export default function ReactRanger() {
  const [values, setValues] = React.useState([20, 50]);

  const { ticks, handles, getTrackProps, segments, activeHandleIndex } =
    useRanger({
      values,
      onChange: setValues,
      min: 0,
      max: 100,
      stepSize: 1,
      // steps: [10, 20, 25],
      tickSize: 5,
      // ticks: [25, 50],
    });

  const COLORS = ["#3E8AFF", "#00D5C0", "#F5C200"];

  return (
    <div>
      <div
        {...getTrackProps({
          style: {
            height: 24,
            background: "#20A4F3",
            borderRadius: 12,
          },
        })}
      >
        {segments.map(({ getSegmentProps }, index) => {
          return (
            <div
              {...getSegmentProps({
                style: {
                  background: COLORS[index],
                  height: 24,
                  borderRadius: 12,
                },
              })}
            ></div>
          );
        })}
        {ticks.map(({ value, getTickProps }) => {
          return (
            <div
              {...getTickProps({
                style: {
                  width: "auto",
                  top: 36,
                  color: "gray",
                  fontSize: 14,
                },
              })}
            >
              {value}
            </div>
          );
        })}
        {handles.map(({ value, getHandleProps }) => {
          return (
            <div
              {...getHandleProps({
                style: {
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#E63462",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                },
              })}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
