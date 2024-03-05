import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React from "react";
import {
  ChatLeft,
  HandThumbsUp,
  Share,
  ThreeDots,
  ThreeDotsVertical,
} from "react-bootstrap-icons";
import SocialCardFooter from "./SocialCardSplit/SocialCardFooter";

enum SocialCardMenuOption {
  Edit = "Edit",
  Delete = "Delete",
  Hide = "Hide",
  Archive = "Archive",
  Save = "Save",
}

export default function SocialCard() {
  const menuOptions = [
    SocialCardMenuOption.Edit,
    SocialCardMenuOption.Delete,
    SocialCardMenuOption.Hide,
    SocialCardMenuOption.Archive,
    SocialCardMenuOption.Save,
  ];

  return (
    <Card maxW="md">
      <CardHeader>
        <Flex gap="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

            <Box>
              <Heading size="sm">Segun Adebayo</Heading>
              <Text mb={0}>Creator, Chakra UI</Text>
            </Box>
          </Flex>

          <Menu>
            <MenuButton as={IconButton} icon={<ThreeDotsVertical />} />
            <MenuList>
              {menuOptions.map((option) => (
                <MenuItem key={option}>{option}</MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          With Chakra UI, I wanted to sync the speed of development with the
          speed of design. I wanted the developer to be just as excited as the
          designer to create a screen.
        </Text>
      </CardBody>
      <Image
        objectFit="cover"
        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Chakra UI"
      />

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button flex="1" variant="ghost" leftIcon={<HandThumbsUp />}>
          Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<ChatLeft />}>
          Comment
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<Share />}>
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}
