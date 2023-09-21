import React, { useState } from "react";
import { mount } from "@cypress/react18";
import { useQuery, QueryClientProvider } from "react-query";
import axios from "axios";
import { queryClient } from "../queryClient";

export default function Form() {
  const { data } = useQuery(["GET_DATA"], async () => {
    const { data } = await axios.get(
      "https://hub.dummyapis.com/delay?seconds=1"
    );
    return data;
  });

  const [name, setName] = useState("");
  if (!data) return null;
  return (
    <div data-cy="form">
      <input
        data-cy="input"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <button onClick={() => {}}>Submit</button>
    </div>
  );
}

describe("<Form />", () => {
  context("when renders", () => {
    it("should wait for endpoint before rendering form", () => {
      cy.intercept({
        url: "https://hub.dummyapis.com/delay*",
        method: "get",
      }).as("getData");

      mount(
        <QueryClientProvider client={queryClient}>
          <Form />
        </QueryClientProvider>
      );
      cy.wait("@getData");
      cy.get('[data-cy="form"]').should("exist");
    });
  });
});
