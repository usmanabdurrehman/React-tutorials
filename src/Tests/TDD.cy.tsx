import React, { useState } from "react";
import { mount } from "@cypress/react18";
import { useMutation } from "react-query";

/*
Should show initialName in the input if passed
Should show value in input when typed
*/

export const Form = ({ initialName = "" }: { initialName?: string }) => {
  const [value, setValue] = useState(initialName);
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      data-cy="input"
    />
  );
};

describe("<Form />", () => {
  context("when typed", () => {
    it("show show value in input", () => {
      mount(<Form />);
      cy.get("[data-cy=input]").type("abc");
      cy.get("[data-cy=input]").should("have.value", "abc");
    });
  });

  context("when typed", () => {
    it("show show value in input", () => {
      mount(<Form initialName="Alex" />);
      cy.get("[data-cy=input]").should("have.value", "Alex");
    });
  });
});
