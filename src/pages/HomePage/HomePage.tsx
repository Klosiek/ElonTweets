import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, HStack } from "@chakra-ui/layout";
import { Tag, TagCloseButton, TagLabel, TagLeftIcon } from "@chakra-ui/tag";
import { useColorModeValue as mode } from "@chakra-ui/color-mode";
import Navbar from "components/Navbar";
import { useFirebase } from "providers/FirebaseProvider";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Skeleton, SkeletonText } from "@chakra-ui/skeleton";
import SetsList from "components/SetsList";

const HomePage = () => {
  const [tags, setLocalTags] = useState<string[]>([]);
  const { setTags, getUserData, loadingUserData } = useFirebase();
  const [newTag, setNewTag] = useState<string>("");

  useEffect(() => {
    getUserData().then((doc) => {
      if (doc?.exists) {
        const userData = doc.data();
        if (userData?.tags) setLocalTags(userData.tags);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNewTag = (tag: string) => {
    const newTags = [...tags, tag];
    setLocalTags(newTags);
    setTags(newTags);
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((x) => x !== tag);
    setLocalTags(newTags);
    setTags(newTags);
  };

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
                  <Tag colorScheme="cyan" w="100%">
                    <TagLeftIcon
                      onClick={() => {
                        if (!tags.includes(newTag) && newTag) {
                          addNewTag(newTag);
                          setNewTag("");
                        }
                      }}
                      boxSize="36px"
                      cursor="pointer"
                    >
                      <FiPlus size="24px" />
                    </TagLeftIcon>

                    <TagLabel w="100%">
                      <Input
                        size="md"
                        onKeyDown={(key) => {
                          if (key.key === "Enter") {
                            if (!tags.includes(newTag) && newTag) {
                              addNewTag(newTag);
                              setNewTag("");
                            }
                          }
                        }}
                        value={newTag}
                        onChange={(value) => setNewTag(value.currentTarget.value)}
                      ></Input>
                    </TagLabel>
                  </Tag>

                  <Flex flexWrap="wrap" p={[null, "8px"]}>
                    {false ? (
                      <SkeletonText isLoaded={loadingUserData} w="100%" mt="4" noOfLines={6} spacing="5" />
                    ) : (
                      tags.map((tag) => (
                        <Tag
                          ml="8px"
                          mt="8px"
                          size="lg"
                          key={tag}
                          borderRadius="full"
                          variant="solid"
                          color="yellow.300"
                          bgColor="green.700"
                        >
                          <TagLabel>{tag}</TagLabel>
                          <TagCloseButton onClick={() => removeTag(tag)} />
                        </Tag>
                      ))
                    )}
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <SetsList />
                </TabPanel>
              </TabPanels>
            </Flex>
          </Tabs>
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;
