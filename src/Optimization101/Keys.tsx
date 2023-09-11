import React, { useMemo, useState } from "react";
import { faker } from "@faker-js/faker";
import { names } from "../constants";

export default function Keys() {
  const [filter, setFilter] = useState("");

  const filteredNames = useMemo(
    () =>
      names.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter]
  );

  console.log("filteredNames", filteredNames?.length);

  return (
    <div style={{ height: "96vh", overflow: "auto" }}>
      <div>
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      <ul>
        {filteredNames.map(({ name, id }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
