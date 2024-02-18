import { use, Suspense } from "react";
import { Error, Loader } from "../Misc";
import { ErrorBoundary } from "react-error-boundary";

const promise: Promise<string> = new Promise((resolve, reject) =>
  setTimeout(() => reject("some data"), 1500)
);

const Child = () => {
  const data = use(promise);
  return <div>{data}</div>;
};

export const UseHook = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loader />}>
        <Child />
      </Suspense>
    </ErrorBoundary>
  );
};
