import React from "react";
import { mount } from "@cypress/react18";

describe("Dependent Test Example", () => {
  beforeEach(() => {
    cy.visit("https://docs.cypress.io/guides/core-concepts/test-isolation");
  });

  it("Test 1", () => {
    cy.contains("Test Isolation");
  });

  it("Test 2, dependent on Test 1", () => {
    cy.contains("Core Concepts");
  });
});
