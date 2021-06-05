import { Input } from "@chakra-ui/input";
import { Flex, HStack } from "@chakra-ui/layout";
import { Tag, TagCloseButton, TagLabel, TagLeftIcon } from "@chakra-ui/tag";
import Navbar from "components/Navbar";
import { useFirebase } from "providers/FirebaseProvider";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

const HomePage = () => {
  const { logout } = useFirebase();
  const [tags, setTags] = useState(["Bitcoin", "Doge", "Crypto", "XRP", "Currency"]);
  const [newTag, setNewTag] = useState("");
  return (
    <div>
      <Navbar></Navbar>
      <Flex flexDir="column">
        <Tag variant="subtle" colorScheme="cyan" w="md">
          <TagLeftIcon
            onClick={() => {
              if (!tags.includes(newTag) && newTag) {
                setTags([...tags, newTag]);
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
                    setTags([...tags, newTag]);
                    setNewTag("");
                  }
                }
              }}
              value={newTag}
              onChange={(value) => setNewTag(value.currentTarget.value)}
            ></Input>
          </TagLabel>
        </Tag>
        <HStack spacing={4} p="8px">
          {tags.map((tag) => (
            <Tag size="sm" key={tag} borderRadius="full" variant="solid" color="yellow.300" bgColor="green.700">
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => setTags(tags.filter((x) => x !== tag))} />
            </Tag>
          ))}
        </HStack>
        <button onClick={logout}>logout</button>Zalogowano
      </Flex>
    </div>
  );
};

export default HomePage;
