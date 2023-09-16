import React from "react";

const otherSentences = ["Other Sentence 1", "Other Sentence 2"];

export default function Fragments() {
  return (
    <div>
      <p>This is a sentence</p>
      <p>This is another sentence</p>
      {otherSentences.map((sentence, index) => (
        <div>
          <p>Sentence No #{index + 1}</p>
          <p>{sentence}</p>
        </div>
      ))}
    </div>
  );
}
