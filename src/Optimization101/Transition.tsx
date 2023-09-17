import { useState, useTransition } from "react";
import { names } from "../constants";

export default function Transition() {
  const [filteredNames, setFilteredNames] = useState(names);
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState("");

  return (
    <div style={{ height: "96vh", overflow: "auto" }}>
      <div>
        <input
          value={filter}
          onChange={(e) => {
            const value = e.target.value;
            setFilter(value);

            startTransition(() => {
              setFilteredNames(
                names.filter(({ name }) =>
                  name.toLowerCase().includes(value?.toLowerCase())
                )
              );
            });
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
