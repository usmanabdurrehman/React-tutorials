import { User } from "./types";
import { Store } from "@tanstack/react-store";

export const store = new Store({
  state: { user: undefined } as { user: User | undefined },
});
