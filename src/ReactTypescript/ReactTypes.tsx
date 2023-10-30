import { Box } from "@chakra-ui/react";
import React from "react";

// React.ReactNode | React.ReactNode | React.ReactNode

const div: React.ReactNode = <div>2</div>;
const stringVal: React.ReactNode = "string";
const numberVal: React.ReactNode = 10;
const undefinedVal: React.ReactNode = undefined;
const nullVal: React.ReactNode = null;
const booleanVal: React.ReactNode = true;

export const CardWrapper = ({ children }: { children: JSX.Element }) => {
  return <Box>{children}</Box>;
};

<CardWrapper>
  <div></div>
</CardWrapper>;
