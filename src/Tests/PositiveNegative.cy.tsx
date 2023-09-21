import React from "react";
import { mount } from "@cypress/react18";

export const Component = ({ showButton }: { showButton: boolean }) => {
  if (!showButton) return null;
  return <button>Submit</button>;
};

describe("<Component />", () => {
  context("when showButton is true", () => {
    it("show show button", () => {
      mount(<Component showButton />);
      cy.get("button:contains(Submit)").should("exist");
    });
  });

  context("when showButton is false", () => {
    it("show hide button", () => {
      mount(<Component showButton={false} />);
      cy.get("button:contains(Submit)").should("not.exist");
    });
  });
});
