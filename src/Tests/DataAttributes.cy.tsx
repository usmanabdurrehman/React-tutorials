import React from "react";
import { mount } from "@cypress/react18";

const Component = () => {
  return <input className="name" data-cy="name" />;
};

describe("<Component />", () => {
  it("renders", () => {
    mount(<Component />);
    cy.get("[data-cy=name]").type("abc");
    cy.get("[data-cy=name]").should("have.value", "abc");
  });
});
