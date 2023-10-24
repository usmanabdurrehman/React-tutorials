import { CloseIcon } from "@chakra-ui/icons";
import {
  Badge,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Stack,
} from "@chakra-ui/react";
import { Pokemon } from "../types";

const TYPE_COLOR_MAP: any = {
  normal: "gray",
  fire: "orange",
  grass: "green",
  poison: "purple",
  flying: "gray",
  water: "cyan",
  bug: "green",
  fairy: "pink",
  electric: "yellow",
  ground: "orange",
  dragon: "purple",
};

export default function PokemonCard({
  pokemon,
  onDelete,
}: {
  pokemon: Pokemon;
  onDelete?: () => void;
}) {
  return (
    <Card width={"400px"} boxShadow={"2xl"} position="relative">
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
        <Grid templateColumns={"repeat(2, 1fr)"} gap={4} mt={4}>
          {pokemon?.stats?.map(({ baseStat, name }) => (
            <GridItem key={name}>
              <Stack direction={"row"}>
                <Badge colorScheme={baseStat < 44 ? "red" : "green"}>
                  {baseStat}
                </Badge>
                <Badge colorScheme={"blackAlpha"}>{name}</Badge>
              </Stack>
            </GridItem>
          ))}
        </Grid>
      </CardBody>
      <IconButton
        position={"absolute"}
        top={5}
        right={5}
        aria-label="delete"
        onClick={() => onDelete && onDelete()}
        colorScheme="red"
      >
        <CloseIcon />
      </IconButton>
    </Card>
  );
}
