import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { usersKey } from "./users";
import { todoKeys } from "./todos";

export const queryKeys = mergeQueryKeys(usersKey, todoKeys);
