import { ChakraProvider } from "@chakra-ui/react";
import { PokemonView } from "./Components/PokemonView";
import "./index.css";

export default function App() {
  return (
    <ChakraProvider>
      <PokemonView />
    </ChakraProvider>
  );
}
