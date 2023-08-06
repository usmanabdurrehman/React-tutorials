import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";

interface FormProps {
  onSubmit: (name: string) => void;
}

export default function Form({ onSubmit }: FormProps) {
  const { data } = useQuery(["GET_DATA"], async () => {
    const { data } = await axios.get(
      "https://hub.dummyapis.com/delay?seconds=3"
    );
    return data;
  });

  const [name, setName] = useState("");
  // if (!data) return null;
  return (
    <div>
      <input
        data-cy="input"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <br />
      <button onClick={() => onSubmit(name)}>Submit</button>
    </div>
  );
}
