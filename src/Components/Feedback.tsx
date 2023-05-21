import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon, keyframes, Spinner } from "@chakra-ui/react";
import { useIsFetching } from "react-query";

const spin = keyframes`  
  from {transform: rotateY(0);}   
  to {transform: rotateY(360deg)}
`;

export const Feedback = ({
  type,
}: {
  type: "error" | "success" | undefined;
}) => {
  const spinAnimation = `${spin} infinite 1s linear`;
  const isLoading = useIsFetching();
  return isLoading || type ? (
    <Flex
      position={"absolute"}
      top={0}
      left={0}
      height={"100vh"}
      width="100vw"
      alignItems={"center"}
      justifyContent="center"
    >
      <Box display="inline" animation={!isLoading ? spinAnimation : undefined}>
        {!!isLoading && <Spinner color="blue" size="lg" />}
        {type === "error" && <CloseIcon color="red" h={8} w={8} />}
        {type === "success" && <CheckIcon color="green" h={8} w={8} />}
      </Box>
    </Flex>
  ) : null;
};
