import React, { useMemo, useState } from "react";
import { Flipper, Flipped, spring } from "react-flip-toolkit";
import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { users as initialUsers } from "../data";
import Card from "./Card";
import { Sort } from "../types";

const onExit = (el: HTMLElement, index: number, removeElement: () => void) => {
  spring({
    onUpdate: (val) => {
      el.style.opacity = `${1 - (val as number)}`;
    },
    onComplete: removeElement,
  });
};

const getCardId = (id: number) => `card-${id}`;

export default function List() {
  const [sort, setSort] = useState<Sort>("asc");
  const [users, setUsers] = useState(initialUsers);

  const userIds = useMemo(() => users.map((user) => user.id), [users]);

  const flipKey = `${userIds.join(",")} ${sort}`;

  const sortedUsers = useMemo(
    () =>
      users.sort((a, b) => {
        if (sort === "asc") {
          return a.id - b.id;
        } else {
          return b.id - a.id;
        }
      }),
    [users, sort]
  );

  return (
    <Box width={"300px"}>
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button
          onClick={() => setSort("asc")}
          colorScheme={sort === "asc" ? "whatsapp" : undefined}
        >
          Asc
        </Button>
        <Button
          onClick={() => setSort("desc")}
          colorScheme={sort === "desc" ? "whatsapp" : undefined}
        >
          Desc
        </Button>
      </ButtonGroup>
      <Flipper flipKey={flipKey} spring={"gentle"}>
        <Flex gap={2} direction="column" mt={5}>
          {sortedUsers.map((user) => (
            <Flipped
              flipId={getCardId(user.id)}
              onExit={onExit}
              key={getCardId(user.id)}
              stagger
            >
              {(props) => (
                <Card
                  user={user}
                  onDelete={() =>
                    setUsers((prevUsers) =>
                      prevUsers.filter((prevUser) => prevUser.id !== user.id)
                    )
                  }
                  {...props}
                />
              )}
            </Flipped>
          ))}
        </Flex>
      </Flipper>
    </Box>
  );
}
