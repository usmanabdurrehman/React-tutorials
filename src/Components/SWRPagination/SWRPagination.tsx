import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import { SWRInfiniteCursorPagination } from "./SWRInfiniteCursorPagination";
import { SWRInfiniteIndexPagination } from "./SWRInfiniteIndexPagination";
import { SWRIndexPagination } from "./SWRSimplePagination";

export default function SWRPagination() {
  return (
    <Box height="100vh">
      <Tabs
        variant="soft-rounded"
        colorScheme="green"
        height={"100%"}
        isFitted={false}
      >
        <Flex direction={"column"} height="100%">
          <Flex position={"fixed"} zIndex={1} width="100%">
            <TabList bg="white" p={4} border="1px solid green" width="100%">
              <Tab>Page Index</Tab>
              <Tab>Infinite Page Index</Tab>
              <Tab>Infinite Cursor</Tab>
            </TabList>
          </Flex>
          <Flex grow={1} mt={20} p={2}>
            <TabPanels>
              <TabPanel height={"100%"}>
                <SWRIndexPagination />
              </TabPanel>
              <TabPanel>
                <SWRInfiniteIndexPagination />
              </TabPanel>
              <TabPanel>
                <SWRInfiniteCursorPagination />
              </TabPanel>
            </TabPanels>
          </Flex>
        </Flex>
      </Tabs>
    </Box>
  );
}
