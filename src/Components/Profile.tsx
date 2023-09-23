import { useStore } from "@tanstack/react-store";
import { store } from "../store";
import { User } from "../types";

export default function Profile() {
  let user = useStore(store, store=>store.state.user)
  if (!user) return <p>No User Information</p>;

  return (
    <div
      style={{
        border: "1px solid black",
        padding: 12,
      }}
    >
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Age: {user.age} years old</p>
    </div>
  );
}
