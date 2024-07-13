import React, { useMemo, useState } from "react";
import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { users as initialUsers } from "../data";
import Card from "./Card";
import { Sort } from "../types";
import { Flipped, Flipper, spring } from "react-flip-toolkit";

const onExit = (
  element: HTMLElement,
  index: number,
  removeElement: () => void
) => {
  spring({
    onUpdate: (val) => {
      element.style.opacity = `${1 - (val as number)}`;
    },
    onComplete: removeElement,
  });
};

export default function List() {
  const [sort, setSort] = useState<Sort>("asc");
  const [users, setUsers] = useState(initialUsers);

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

  const flipKey = `${users.map((user) => user.id).join(",")} ${sort}`;

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
      <Flipper flipKey={flipKey} spring="gentle">
        <Flex gap={2} direction="column" mt={5}>
          {sortedUsers.map((user) => (
            <Flipped flipId={user.id} key={user.id} onExit={onExit} stagger>
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
