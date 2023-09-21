import React from "react";
import { mount } from "@cypress/react18";

export const Component = ({ onClick }: { onClick: () => void }) => {
  return <button onClick={onClick}>Submit</button>;
};

describe("<Component />", () => {
  context("when button is clicked", () => {
    it("should call onClick", () => {
      const onClick = cy.stub();
      mount(<Component onClick={onClick} />);

      cy.get("button:contains(Submit)").click();
      cy.wrap(onClick).should("be.called");
    });
  });
});
