import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Box, Flex, Text } from "@chakra-ui/react";

interface DroppableProps extends React.PropsWithChildren {
  id: string;
}

export const Droppable = ({ children, id }: DroppableProps) => {
  let { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style: React.CSSProperties = {
    background: isOver ? "#a0f0a0" : undefined,
    transition: "1s",
    color: isOver ? "#40a628" : "lightgray",
  };

  return (
    <Flex
      ref={setNodeRef}
      style={style}
      height="100%"
      alignItems={"center"}
      justifyContent="center"
    >
      <Text fontWeight={"bold"}>Drop Here</Text>
    </Flex>
  );
};
