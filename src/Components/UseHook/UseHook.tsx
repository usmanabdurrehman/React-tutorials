// @ts-ignore
import { useEffect, useState, use, Suspense } from "react";
import { Error, Loader } from "../Misc";
import { User } from "../../types";
import { ErrorBoundary } from "react-error-boundary";

const promise = fetch("http://localhost:7000/users").then((res) => res.json());

const Child = ({ shouldLoad }: { shouldLoad?: boolean }) => {
  let data;
  if (shouldLoad) data = use(promise);

  return (
    <ul>
      {data?.map((user: User) => (
        <li>{user?.name}</li>
      ))}
    </ul>
  );
};

export const UseHook = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loader />}>
        <Child shouldLoad />
      </Suspense>
    </ErrorBoundary>
  );
};
