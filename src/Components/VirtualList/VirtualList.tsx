import * as React from "react";
import { faker } from "@faker-js/faker";

import { useVirtualizer } from "@tanstack/react-virtual";

import "./index.css";

const randomNumber = (min: number, max: number) =>
  faker.datatype.number({ min, max });

const sentences = new Array(10000)
  .fill(true)
  .map(() => faker.lorem.sentence(randomNumber(20, 70)));

export function VirtualList() {
  const parentElement = React.useRef(null);

  const count = sentences.length;
  const virtaulizer = useVirtualizer({
    count,
    getScrollElement: () => parentElement.current,
    estimateSize: () => 45,
  });

  const items = virtaulizer.getVirtualItems();

  return (
    <div
      style={{ height: 400, width: 400, overflowY: "auto" }}
      ref={parentElement}
    >
      <div
        style={{
          position: "relative",
          height: virtaulizer.getTotalSize(),
          width: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${items[0].start}px)`,
          }}
        >
          {items.map((item) => (
            <div ref={virtaulizer.measureElement} key={item.key}>
              <p>{sentences[item.index]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
