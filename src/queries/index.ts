import { todoKeys } from "./todos";
import { userKeys } from "./users";
import { mergeQueryKeys } from "@lukemorales/query-key-factory";

export const queryKeys = mergeQueryKeys(userKeys, todoKeys);
