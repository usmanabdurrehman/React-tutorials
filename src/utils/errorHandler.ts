import { Mutation, Query, QueryKey } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { removeAccessToken, setAccessToken } from "./tokenHandler";
import { getNewRefreshToken } from "../endpoints/getNewRefreshToken";

let isRefreshing = false;

let failedQueue: {
  query?: Query<unknown, unknown, unknown, QueryKey>;
  mutation?: Mutation<unknown, unknown, unknown, unknown>;
  variables?: unknown;
}[] = [];

const processFailedQueue = () => {
  failedQueue.forEach(({ query, mutation, variables }) => {
    if (query) {
      query.fetch();
    }
    if (mutation) {
      mutation.execute(variables);
    }
  });
  isRefreshing = false;
  failedQueue = [];
};

const refreshTokenAndRetry = async (
  query?: Query<unknown, unknown, unknown, QueryKey>,
  mutation?: Mutation<unknown, unknown, unknown, unknown>,
  variables?: unknown
) => {
  try {
    if (!isRefreshing) {
      isRefreshing = true;
      failedQueue.push({ query, mutation, variables });
      const { token } = await getNewRefreshToken();
      setAccessToken(token);
      processFailedQueue();
    } else {
      failedQueue.push({ query, mutation, variables });
    }
  } catch {
    removeAccessToken();
  }
};

const errorHandler = (
  error: unknown,
  query?: Query<unknown, unknown, unknown, QueryKey>,
  mutation?: Mutation<unknown, unknown, unknown, unknown>,
  variables?: unknown
) => {
  const { status } = (error as AxiosError<any>).response!;

  if (status === 401) {
    if (query) refreshTokenAndRetry(query);
    if (mutation) refreshTokenAndRetry(undefined, mutation, variables);
  }
};

export const queryErrorHandler = (
  error: unknown,
  query: Query<unknown, unknown, unknown, QueryKey>
) => {
  errorHandler(error, query);
};

export const mutationErrorHandler = (
  error: unknown,
  variables: unknown,
  _context: unknown,
  mutation: Mutation<unknown, unknown, unknown, unknown>
) => {
  errorHandler(error, undefined, mutation, variables);
};
