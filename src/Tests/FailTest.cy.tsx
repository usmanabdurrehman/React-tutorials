import React from "react";
import { mount } from "@cypress/react18";

export const Component = () => {
  return <button>Save</button>;
};

describe("<Component />", () => {
  it.only("renders", () => {
    mount(<Component />);
    cy.get("button:contains(Save)").should("exist");
  });
});
