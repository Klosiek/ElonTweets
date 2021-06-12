import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { useColorModeValue as mode } from "@chakra-ui/color-mode";
import * as Types from "./Set.types";
import { Image } from "@chakra-ui/image";
import { Button } from "@chakra-ui/button";
import { useEffect, useState } from "react";
import { useFirebase } from "providers/FirebaseProvider";

const Set = ({ title, topic, img }: Types.Props) => {
  const { currentUser, getUserData, subscribeToSet, unsubscribeFromSet } = useFirebase();
  const [isUserSubscribingToSet, setIsUserSubscribingToSet] = useState(false);

  useEffect(() => {
    if (currentUser) {
      getUserData(currentUser.uid).then((user) => {
        const userData = user.data();
        if (userData?.sets) {
          const sets = [...userData.sets];
          if (sets.includes(title)) {
            setIsUserSubscribingToSet(true);
          }
        } else setIsUserSubscribingToSet(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    const handleSubscribtion = isUserSubscribingToSet ? unsubscribeFromSet : subscribeToSet;
    handleSubscribtion(title).then((sets) => {
      if (sets) setIsUserSubscribingToSet(sets.includes(title));
    });
  };

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
        <Button
          variant={isUserSubscribingToSet ? "outline" : "solid"}
          onClick={async () => {
            handleClick();
          }}
          justifySelf="flex-end"
        >
          {isUserSubscribingToSet ? "Unsubscribe" : "Subscribe"}
        </Button>
      </Flex>
    </Box>
  );
};

export default Set;
