import React, { lazy, useState, Suspense } from "react";

const LazyExample = lazy(() => import("../misc/Example"));

export default function LazyWrapper() {
  const [showLazyComp, setShowLazyComp] = useState(false);
  return (
    <div>
      I am a Lazy Wrapper
      <button onClick={() => setShowLazyComp(true)}>Show Lazy Comp</button>
      <Suspense fallback={<p>Loading...</p>}>
        {showLazyComp && <LazyExample />}
      </Suspense>
    </div>
  );
}
