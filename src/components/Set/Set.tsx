import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { useColorModeValue as mode } from "@chakra-ui/color-mode";
import * as Types from "./Set.types";
import { Image } from "@chakra-ui/image";
import { Button } from "@chakra-ui/button";

const Set = ({ title, topic, img }: Types.Props) => {
  return (
    <Box mt="8px">
      <Flex
        rounded="xl"
        justifyContent="space-between"
        flexDir="column"
        p="24px"
        boxSize="350px"
        bgColor={mode("panelLight", "panelDark")}
      >
        <Flex justifyContent="space-between">
          <Heading>{title}</Heading>
          <Box>
            <Image boxSize="80px" src={img} />
          </Box>
        </Flex>
        <Box>
          <Text>{topic}</Text>
        </Box>
        <Button justifySelf="flex-end">Subscribe</Button>
      </Flex>
    </Box>
  );
};

export default Set;
