import React, { useEffect, useState, use, Suspense } from "react";
import { timeout } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

// http://localhost:7000/users

const promise = fetch("http://localhost:7000/error").then((res) => res.json());

const Child = ({ shouldLoad }: { shouldLoad: boolean }) => {
  let data;

  if (shouldLoad) data = use(promise);

  return (
    <ul>
      {data?.map((user: any) => (
        <li>{user?.name}</li>
      ))}
    </ul>
  );
};

export default function UseHook() {
  return (
    <ErrorBoundary fallback={<p>Something Happened!</p>}>
      <Suspense fallback={<p>Loading...</p>}>
        <Child shouldLoad={false} />
      </Suspense>
    </ErrorBoundary>
  );
}
