import { Button, Flex } from "@chakra-ui/react";
import { onlineManager } from "@tanstack/react-query";

export const TanstackQueryOnlineManager = () => {
  return (
    <Flex gap={4} m={4}>
      <Flex>
        <Button
          colorScheme={"whatsapp"}
          onClick={() => {
            console.log("isOnline", onlineManager.isOnline());
          }}
        >
          Check if online
        </Button>
      </Flex>
      <Flex>
        <Button
          colorScheme={"whatsapp"}
          onClick={() => onlineManager.setOnline(true)}
        >
          Toggle Online Status
        </Button>
      </Flex>
      <Flex>
        <Button
          colorScheme={"whatsapp"}
          onClick={() =>
            onlineManager.subscribe(() => {
              console.log("subbed");
            })
          }
        >
          Subscribe
        </Button>
      </Flex>

      <Flex>
        <Button
          colorScheme={"whatsapp"}
          onClick={() => onlineManager.onOnline()}
        >
          On Online
        </Button>
      </Flex>

      <Flex>
        <Button
          colorScheme={"whatsapp"}
          onClick={() =>
            console.log("has listeners", onlineManager.hasListeners())
          }
        >
          Has Listeners
        </Button>
      </Flex>
    </Flex>
  );
};
