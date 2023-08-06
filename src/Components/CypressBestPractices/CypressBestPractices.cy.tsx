import React from "react";
import CypressBestPractices from "./CypressBestPractices";
import { mount } from "@cypress/react18";
import { QueryClient, QueryClientProvider } from "react-query";

/*
Selecting Elements
Selecting by text content
Aliases
Tests running independently
Arbitrary Waiting
baseUrl
Chaining Assertions
beforeEach
Use of .then
*/

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0,
    },
  },
});

describe("<CypressBestPractices />", () => {
  it.only("renders", () => {
    const onSubmit = cy.stub();
    cy.intercept({ method: "GET", url: "https://hub.dummyapis.com/delay*" }).as(
      "getData"
    );

    mount(
      <QueryClientProvider client={queryClient}>
        <CypressBestPractices onSubmit={onSubmit} />
      </QueryClientProvider>
    );
    cy.wait("@getData");

    cy.get("[data-cy=input]").as("input");

    cy.get("@input").type("abc");
    cy.get("@input").blur();
    cy.get("button:contains(Submit)").click();
    cy.wrap(onSubmit).should("be.called");
  });
});
