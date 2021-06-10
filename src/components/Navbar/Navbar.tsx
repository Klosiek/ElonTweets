import { IconButton } from "@chakra-ui/button";
import { Flex, Heading } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { useColorModeValue as mode } from "@chakra-ui/color-mode";
import { Switch } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/system";
import { FcSettings } from "react-icons/fc";
import { useFirebase } from "providers/FirebaseProvider";

const Navbar = () => {
  const { logout } = useFirebase();
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Flex bgColor={mode("panelLight", "panelDark")} p="12px" justifyContent="space-between" alignItems="center">
      <Heading size="xl" fontWeight="extrabold">
        Filtrelon
      </Heading>
      <Menu>
        <MenuButton _focus={{ border: "none" }}>
          <IconButton
            aria-label="settings"
            icon={
              <Flex justifyContent="center" alignItems="center" w="100%" h="100%">
                <FcSettings size="32px" />
              </Flex>
            }
          />
        </MenuButton>
        <MenuList>
          <Flex ml="12px" mr="12px" alignItems="center" justifyContent="space-between">
            Color mode
            <Switch isChecked={colorMode === "dark" ? false : true} onChange={toggleColorMode} />
          </Flex>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Navbar;
