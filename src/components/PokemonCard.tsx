import {
  Badge,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import { Pokemon } from "../types";
import { TYPE_COLOR_MAP } from "../constants";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Card boxShadow={"2xl"}>
      <CardBody>
        <Flex justifyContent={"center"}>
          <Image src={pokemon?.image} borderRadius="lg" />
        </Flex>
        <Stack mt="6" spacing="3">
          <Heading size="md">{pokemon?.name?.toUpperCase()}</Heading>
        </Stack>
        <Stack direction="row">
          {pokemon?.types?.map((type) => (
            <Badge
              color={`${TYPE_COLOR_MAP[type]}.500`}
              bg={`${TYPE_COLOR_MAP[type]}.300`}
              key={type}
            >
              {type}
            </Badge>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}
