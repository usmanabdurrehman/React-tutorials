import { Box } from "@chakra-ui/react";

const div: React.ReactElement = <div />;
const stringVal: React.ReactNode = "string";
const numberVal: React.ReactNode = 10;
const undefinedVal: React.ReactNode = undefined;
const nullVal: React.ReactNode = null;

export const CardWrapper = ({ children }) => {
  return <Box>{children}</Box>;
};

<CardWrapper>s</CardWrapper>;

const circle: Shape.Circle = { id: 1, radius: 4 };
