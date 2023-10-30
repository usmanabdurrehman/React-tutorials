import { CloseIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";

export default function Todo({
  title,
  onDelete,
}: {
  title: string;
  onDelete?: () => void;
}) {
  return (
    <Flex width={"400px"} boxShadow={"2xl"}>
      <Text>{title}</Text>
      {onDelete && (
        <IconButton
          position={"absolute"}
          top={5}
          right={5}
          aria-label="delete"
          onClick={onDelete}
          colorScheme="red"
        >
          <CloseIcon />
        </IconButton>
      )}
    </Flex>
  );
}

<Todo title="Groceries" />;
