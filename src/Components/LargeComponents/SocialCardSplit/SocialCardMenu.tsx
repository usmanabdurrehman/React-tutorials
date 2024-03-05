import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { ThreeDotsVertical } from "react-bootstrap-icons";

enum SocialCardMenuOption {
  Edit = "Edit",
  Delete = "Delete",
  Hide = "Hide",
  Archive = "Archive",
  Save = "Save",
}

export default function SocialCardMenu() {
  const menuOptions = [
    SocialCardMenuOption.Edit,
    SocialCardMenuOption.Delete,
    SocialCardMenuOption.Hide,
    SocialCardMenuOption.Archive,
    SocialCardMenuOption.Save,
  ];

  return (
    <Menu>
      <MenuButton as={IconButton} icon={<ThreeDotsVertical />} />
      <MenuList>
        {menuOptions.map((option) => (
          <MenuItem key={option}>{option}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
