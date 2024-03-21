import React, { useState } from "react";
import { Component1, Component2 } from "./Dummy";

export default function State() {
  const [text, setText] = useState("");
  return (
    <div style={{ height: "47vh" }}>
      <h2>State</h2>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <Component1 />
      <Component2 />
    </div>
  );
}
