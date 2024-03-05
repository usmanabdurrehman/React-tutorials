import { Button } from "@chakra-ui/react";
import React from "react";
import { ChatLeft, HandThumbsUp, Share } from "react-bootstrap-icons";

export default function SocialCardFooter() {
  return (
    <>
      <Button flex="1" variant="ghost" leftIcon={<HandThumbsUp />}>
        Like
      </Button>
      <Button flex="1" variant="ghost" leftIcon={<ChatLeft />}>
        Comment
      </Button>
      <Button flex="1" variant="ghost" leftIcon={<Share />}>
        Share
      </Button>
    </>
  );
}
