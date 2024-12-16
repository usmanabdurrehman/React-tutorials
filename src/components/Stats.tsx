import { Stats as StatsType } from "../types";
import { Badge, Box, Flex, Heading } from "@chakra-ui/react";
import { TYPE_COLOR_MAP } from "../constants";

export default function Stats({ stats }: { stats: StatsType | undefined }) {
  return (
    <Box p={4} bg="white" borderRadius="md" boxShadow="md" mt={4}>
      <Heading>{stats?.numPokemons} Pokemons</Heading>
      <hr style={{ margin: "4px 0" }} />
      <Heading fontSize="md">Types</Heading>
      <Flex flexWrap="wrap" gap={2}>
        {stats?.types.map((type) => (
          <Badge
            key={type}
            color={`${TYPE_COLOR_MAP[type]}.500`}
            bg={`${TYPE_COLOR_MAP[type]}.300`}
          >
            {type}
          </Badge>
        ))}
      </Flex>
    </Box>
  );
}
