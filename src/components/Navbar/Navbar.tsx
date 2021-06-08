import { Button, IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { useColorModeValue as mode } from "@chakra-ui/color-mode";
import { Switch } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/system";
import { useState, useEffect } from "react";
import { FcSettings } from "react-icons/fc";
import { IoMdNotifications } from "react-icons/io";
import { useFirebase } from "providers/FirebaseProvider";

export interface Notifications {
  emails: boolean;
  desktop: boolean;
  phone: boolean;
}

const Navbar = () => {
  const { logout, setNotifications, getUserData } = useFirebase();
  const { toggleColorMode, colorMode } = useColorMode();
  const [localNotifications, setLocalNotifications] = useState<Notifications>({
    emails: false,
    desktop: false,
    phone: false,
  });

  const saveNotifications = () => {
    setNotifications(localNotifications);
  };

  useEffect(() => {
    getUserData().then((doc) => {
      if (doc?.exists) {
        const data = doc?.data();
        if (data?.notifications) setLocalNotifications(data.notifications);
      }
    });
  }, []);

  return (
    <Flex bgColor={mode("panelLight", "panelDark")} p="12px" justifyContent="space-between" alignItems="center">
      <Heading size="xl" fontWeight="extrabold">
        Elon Tweets
      </Heading>
      <Flex justifyContent="space-between" w="100px">
        <Menu>
          <MenuButton _focus={{ border: "none" }}>
            <IconButton aria-label="notifications" icon={<IoMdNotifications size="36px" />}></IconButton>
          </MenuButton>
          <MenuList p="12px" display="flex" flexDir="column" justifyContent="space-between" h="150px">
            <Box>
              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel mb="0">Email alerts</FormLabel>
                <Switch
                  isChecked={localNotifications.emails}
                  onChange={() => setLocalNotifications({ ...localNotifications, emails: !localNotifications.emails })}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel mb="0">Desktop alerts</FormLabel>
                <Switch
                  isChecked={localNotifications.desktop}
                  onChange={() =>
                    setLocalNotifications({ ...localNotifications, desktop: !localNotifications.desktop })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel mb="0">Phone alerts</FormLabel>
                <Switch
                  isChecked={localNotifications.phone}
                  onChange={() => setLocalNotifications({ ...localNotifications, phone: !localNotifications.phone })}
                />
              </FormControl>
            </Box>
            <Flex justifyContent="flex-end">
              <Button onClick={saveNotifications} size="sm">
                Save
              </Button>
            </Flex>
          </MenuList>
        </Menu>
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
    </Flex>
  );
};

export default Navbar;
