import { Input } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import { SkeletonText } from "@chakra-ui/skeleton";
import { Tag, TagCloseButton, TagLabel, TagLeftIcon } from "@chakra-ui/tag";
import { useFirebase } from "providers/FirebaseProvider";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

const TagsList = () => {
  const { setTags, getUserData, loadingUserData } = useFirebase();
  const [tags, setLocalTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>("");

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

  useEffect(() => {
    getUserData().then((doc) => {
      if (doc?.exists) {
        const userData = doc.data();
        if (userData?.tags) setLocalTags(userData.tags);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
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
    </Box>
  );
};

export default TagsList;
