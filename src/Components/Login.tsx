import React from "react";
import { store } from "../store";

const user = {
  name: "Alex Reynolds",
  email: "alex@gmail.com",
  age: 79,
};

export default function Login() {
  return (
    <div>
      <button
        onClick={() =>
          store.setState(() => {
            return { state: { user } };
          })
        }
      >
        Set User
      </button>
    </div>
  );
}
