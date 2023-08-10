import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import PokemonList from "./PokemonList";

export default function ReactQuerySuspense() {
  return (
    <Box m={10}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ error, resetErrorBoundary }) => (
              <div>
                There was an error!
                <Button onClick={() => resetErrorBoundary()}>Try again</Button>
              </div>
            )}
          >
            <React.Suspense fallback={<h1>Loading pokemon...</h1>}>
              <PokemonList />
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Box>
  );
}
