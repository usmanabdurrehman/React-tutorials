import React from "react";
import { FixedSizeList as List } from "react-window";
import { names } from "../constants";

const Row = ({ index, style }: { index: number; style: any }) => (
  <div style={style}>{names[index]?.name}</div>
);

export default function Virtualization() {
  return (
    <div>
      <List height={700} itemCount={1000} itemSize={35} width={800}>
        {Row}
      </List>
      {/* {names.map(({ name }) => (
        <div>{name}</div>
      ))} */}
    </div>
  );
}
