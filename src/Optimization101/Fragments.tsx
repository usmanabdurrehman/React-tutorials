import React from "react";

const otherSentences = ["Other Sentence 1", "Other Sentence 2"];

export default function Fragments() {
  return (
    <>
      <p>This is a sentence</p>
      <p>This is another sentence</p>
      {otherSentences.map((sentence, index) => (
        <>
          <p>Sentence No ${index + 1}</p>
          <p>{sentence}</p>
        </>
      ))}
    </>
  );
}
