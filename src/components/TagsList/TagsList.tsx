import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import { SkeletonText } from "@chakra-ui/skeleton";
import { IconButton } from "@chakra-ui/react";
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/tag";
import { useFirebase } from "providers/FirebaseProvider";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

const TagsList = () => {
  const { setTags, getUserData, loadingUserData, currentUser } = useFirebase();
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
    if (currentUser) {
      getUserData(currentUser?.uid).then((doc) => {
        if (doc?.exists) {
          const userData = doc.data();
          if (userData?.tags) setLocalTags(userData.tags);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <InputGroup>
        <InputLeftElement
          color="gray.300"
          fontSize="1.2em"
          children={<IconButton aria-label="plus" icon={<FiPlus color="green.500" />} />}
          onClick={() => {
            if (!tags.includes(newTag) && newTag) {
              addNewTag(newTag);
              setNewTag("");
            }
          }}
        />
        <Input
          textAlign="center"
          placeholder="Tag"
          w="sm"
          onKeyDown={(key) => {
            if (key.key === "Enter") {
              if (!tags.includes(newTag) && newTag) {
                addNewTag(newTag);
                setNewTag("");
              }
            }
          }}
        />
      </InputGroup>
      {/* <Tag colorScheme="cyan">
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

        <TagLabel>
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
      </Tag> */}

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
