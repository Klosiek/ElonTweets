import { IconButton } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import { keyframes } from "@chakra-ui/system";
import { truncate } from "fs";
import { FcSettings } from "react-icons/fc";

const Navbar = () => {
  const spin = keyframes({
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  });

  return (
    <Flex bgColor="panelDark" p="12px" justifyContent="space-between" alignItems="center">
      <Box>Elon Tweets</Box>
      <Box>
        <IconButton
          aria-label="settings"
          icon={
            <Flex
              justifyContent="center"
              alignItems="center"
              w="100%"
              h="100%"
              _hover={{
                animation: `${spin} 2.8s linear infinite`,
              }}
            >
              <FcSettings size="32px" />
            </Flex>
          }
        ></IconButton>
      </Box>
    </Flex>
  );
};

export default Navbar;
