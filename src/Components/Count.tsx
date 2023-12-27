import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type SingleCountState = {
  singleCount: number;
  incSingleCount: () => void;
};

type SingleCountSetter = (
  setter: (state: SingleCountState) => Partial<SingleCountState>
) => void;

const useSingleCount = (set: SingleCountSetter) => ({
  singleCount: 0,
  incSingleCount: () =>
    set((state: SingleCountState) => ({ singleCount: state.singleCount + 1 })),
});

type DoubleCountState = {
  doubleCount: number;
  incDoubleCount: () => void;
};

type DoubleCountSetter = (
  setter: (state: DoubleCountState) => Partial<DoubleCountState>
) => void;

const useDoubleCount = (set: DoubleCountSetter) => ({
  doubleCount: 0,
  incDoubleCount: () =>
    set((state) => ({ doubleCount: state.doubleCount + 2 })),
});

const useCount = create<SingleCountState & DoubleCountState>()((set) => ({
  ...useSingleCount(set),
  ...useDoubleCount(set),
}));

export const Count = () => {
  //   const { singleCount, incSingleCount } = useSingleCount((state) => state);
  //   const { doubleCount, incDoubleCount } = useDoubleCount((state) => state);

  const { singleCount, doubleCount, incDoubleCount, incSingleCount } = useCount(
    (state) => state
  );

  return (
    <Box m={12}>
      <Flex gap={4}>
        <Flex
          width={200}
          boxShadow="lg"
          borderRadius={"md"}
          alignItems="center"
          justifyContent={"center"}
        >
          <Text fontSize="9xl">{singleCount}</Text>
        </Flex>
        <Flex
          width={200}
          boxShadow="lg"
          borderRadius={"md"}
          alignItems="center"
          justifyContent={"center"}
        >
          <Text fontSize="9xl">{doubleCount}</Text>
        </Flex>
      </Flex>
      <Flex justifyContent={"center"} mt={12}>
        <Button
          onClick={() => {
            incDoubleCount();
            incSingleCount();
          }}
        >
          Increment
        </Button>
      </Flex>
    </Box>
  );
};
