import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { User } from "../types";
import { XLg } from "react-bootstrap-icons";

interface CardProps {
  user: User;
  onDelete: () => void;
}

export default function Card({
  user: { age, avatar, jobTitle, name },
  onDelete,
  ...rest
}: CardProps) {
  return (
    <Flex
      alignItems="center"
      gap={2}
      borderRadius="12px"
      boxShadow={"lg"}
      p={2}
      bg="white"
      pos="relative"
      minWidth={"250px"}
      cursor="pointer"
      {...rest}
    >
      <Box>
        <Image src={avatar} width={"40px"} height="40px" borderRadius="50%" />
        <Box flex="1">
          <Text fontSize="medium" mb={1}>
            {name}
          </Text>
          <Text fontSize="x-small" color="#aaa" mb={0}>
            {jobTitle}
          </Text>
          <Text fontSize="x-small" color="#aaa" mb={0}>
            {age} years
          </Text>
        </Box>
        <IconButton
          aria-label="Delete User"
          icon={<XLg />}
          color="red"
          bg="white"
          _hover={{
            bg: "#ffdcdc",
          }}
          size="xs"
          pos="absolute"
          top={1}
          right={1}
          onClick={onDelete}
        />
      </Box>
    </Flex>
  );
}
