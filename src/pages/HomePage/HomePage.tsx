import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useColorModeValue as mode } from "@chakra-ui/color-mode";
import Navbar from "components/Navbar";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import SetsList from "components/SetsList";
import TagsList from "components/TagsList";
import Intro from "components/Intro";
import { useFirebase } from "providers/FirebaseProvider";
import { useMediaQuery } from "@chakra-ui/react";

const HomePage = () => {
  const { isNewUser } = useFirebase();
  const isMobile = useMediaQuery("(max-width: 968px)");
  return (
    <Box>
      <Navbar></Navbar>
      <Flex flexDir="column">
        <Box>
          <Box pl="16px" pt="24px" pb="24px" bgColor={mode("panelSecondaryLight", "panelSecondaryDark")}>
            <Heading>Tags</Heading>
          </Box>
          <Tabs h="xl">
            <TabList bgColor={mode("panelSecondaryLight", "panelSecondaryDark")} pl="16px" pb="16px">
              <Tab
                _focus={{
                  borderTop: "none",
                  borderRight: "none",
                  borderLeft: "none",
                }}
              >
                Overview
              </Tab>
              <Tab
                _focus={{
                  borderTop: "none",
                  borderRight: "none",
                  borderLeft: "none",
                }}
              >
                Sets
              </Tab>
            </TabList>
            <Flex h="100%" p={[null, "48px"]}>
              <TabPanels>
                <TabPanel p={[null, "10px"]} rounded={[null, "xl"]} h="100%" bgColor={mode("panelLight", "panelDark")}>
                  <TagsList />
                </TabPanel>
                <TabPanel>
                  <SetsList />
                </TabPanel>
              </TabPanels>
            </Flex>
          </Tabs>
        </Box>
      </Flex>
      {isNewUser && !isMobile && <Intro />}
    </Box>
  );
};

export default HomePage;
