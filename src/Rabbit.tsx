import { Box, Flex, Img } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./Rabbit.css";

export default function Rabbit() {
  const [showPikachu, setShowPikachu] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      switch (true) {
        case e.key === "s": {
          setTimeout(() => setShowPikachu(true), 2500);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Flex>
      <Flex
        bg="#FE4002"
        height="250px"
        width="300px"
        borderRadius="3xl"
        p={2}
        gap={"5px"}
      >
        <Flex
          bg="black"
          width="220px"
          height="100%"
          borderRadius="3xl"
          alignItems={"center"}
          justifyContent="center"
          pos="relative"
        >
          <Flex
            height="100%"
            width="100%"
            alignItems={"center"}
            justifyContent="center"
            pos={"absolute"}
            top={0}
            left={0}
          >
            <Img
              src="https://media.tenor.com/Leq7mrkrbbgAAAAi/rabbit-r1-bunny-ai.gif"
              height="80px"
              width="80px"
              className={showPikachu ? "fadeOut" : "fadeIn"}
            />
          </Flex>

          <Flex
            height="100%"
            width="100%"
            alignItems={"center"}
            justifyContent="center"
            pos={"absolute"}
            top={0}
            left={0}
          >
            <Img
              src="/pikachu.png"
              width="140px"
              className={`pikachu ${showPikachu ? "fadeIn" : "fadeOut"}`}
            />
          </Flex>
          {showPikachu && <audio autoPlay src="/pikachu_pokedex.mp3" />}
        </Flex>
        <Box flex="1" pos={"relative"}>
          <Img
            src="/controls.png"
            pos="absolute"
            top="0px"
            right="0px"
            width="100%"
          />
        </Box>
      </Flex>
      <Box
        height="20px"
        width="6px"
        marginTop={"80px"}
        bg="linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(57,57,57,1) 100%);"
        borderRadius="0px 4px 4px 0"
        border="1px solid #ccc"
        borderLeft="none"
      ></Box>
    </Flex>
  );
}
