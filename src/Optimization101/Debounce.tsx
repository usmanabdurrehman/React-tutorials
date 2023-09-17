import React, { useMemo, useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { names } from "../constants";

export default function Debounce() {
  const [filter, setFilter] = useState("");
  const [debouncedFilter] = useDebounce(filter, 500);

  const filteredNames = useMemo(
    () =>
      names.filter(({ name }) =>
        name.toLowerCase().includes(debouncedFilter?.toLowerCase())
      ),
    [debouncedFilter]
  );

  useEffect(() => {
    console.log("filteredNames updated");
  }, [filteredNames]);

  return (
    <div style={{ height: "96vh", overflow: "auto" }}>
      <div>
        <input
          value={filter}
          onChange={(e) => {
            const value = e.target.value;
            setFilter(value);
          }}
        />
      </div>
      <ul>
        {filteredNames.map(({ name, id }, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
