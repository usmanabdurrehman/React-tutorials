import React, { useMemo, useState } from "react";
import { Flipper, Flipped, spring } from "react-flip-toolkit";
import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { users as initialUsers } from "../data";
import { X, XLg } from "react-bootstrap-icons";

const onElementAppear = (el, index) =>
  spring({
    onUpdate: (val) => {
      el.style.opacity = val;
    },
    delay: index * 50,
  });

const onExit = (type) => (el, index, removeElement) => {
  spring({
    config: { overshootClamping: true },
    onUpdate: (val) => {
      console.log({ val });
      el.style.opacity = 1 - val;
      //   el.style.transform = `scale${type === "grid" ? "X" : "Y"}(${1 - val})`;
    },
    delay: index * 50,
    onComplete: removeElement,
  });

  return () => {
    el.style.opacity = "";
    removeElement();
  };
};

const onGridExit = onExit("grid");
const onListExit = onExit("list");

const shouldFlip = (prev, current) => {
  if (prev.type !== current.type) {
    return true;
  }
  return false;
};

export default function List() {
  const [sort, setSort] = useState("asc");
  const [isFocussed, setIsFocussed] = useState(false);
  const [users, setUsers] = useState(initialUsers);

  const userIds = useMemo(() => users.map((user) => user.id), [users]);

  const decisionData = useMemo(() => {
    return { users, sort, isFocussed };
  }, [users, sort, isFocussed]);

  return (
    <Flipper
      flipKey={`${userIds.join(",")}`}
      spring={"wobbly"}
      decisionData={decisionData}
    >
      <Flipped flipId="list">
        <Flex>
          <Flipped inverseFlipId="list">
            <Flex gap={2} direction="column">
              {users
                .sort((a, b) => {
                  if (sort === "asc") {
                    return a.id - b.id;
                  } else {
                    return b.id - a.id;
                  }
                })
                .map(({ id, name, avatar, jobTitle, age }) => (
                  <Flipped
                    flipId={`flip-${id}`}
                    onAppear={onElementAppear}
                    onExit={onGridExit}
                    key={`flip-${id}`}
                    stagger
                    shouldInvert={shouldFlip}
                  >
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
                    >
                      <Image
                        src={avatar}
                        width={"40px"}
                        height="40px"
                        borderRadius="50%"
                      />
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
                        onClick={() =>
                          setUsers((prevUsers) =>
                            prevUsers.filter((user) => user.id !== id)
                          )
                        }
                      />
                    </Flex>
                  </Flipped>
                ))}
            </Flex>
          </Flipped>
        </Flex>
      </Flipped>
    </Flipper>
  );
}
