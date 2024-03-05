import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { menuOptions } from "./SocialCardMenu.constants";

export default function SocialCardMenu() {
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
