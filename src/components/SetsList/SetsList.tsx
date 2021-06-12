import { Flex } from "@chakra-ui/layout";
import Set from "components/Set";
import * as SharedTypes from "shared/types";

const SetsList = () => {
  const setsList: SharedTypes.Set[] = [
    {
      title: "Crypto",
      img: "https://firebasestorage.googleapis.com/v0/b/filtrelon.appspot.com/o/sets%2Fcrypto.webp?alt=media&token=5a83378d-558f-44c8-af57-770f50fb79c9",
      tags: ["bitcoin"],
      topic:
        "Wanna be updated on Cryptospace and don't want to miss any Elon's post? Subscribe to that topic so we will notify you when it happens!",
    },
    {
      title: "SpaceX",
      img: "https://firebasestorage.googleapis.com/v0/b/filtrelon.appspot.com/o/sets%2Fspacex.png?alt=media&token=070989db-e5a8-4fa6-a15c-2c449a6e5056",
      tags: ["spacex"],
      topic:
        "Wanna be updated with SpaceX and don't want to miss any Elon's post? Subscribe to that topic so we will notify you when it happens!",
    },
    {
      title: "Tesla",
      img: "https://firebasestorage.googleapis.com/v0/b/filtrelon.appspot.com/o/sets%2Ftesla.png?alt=media&token=d77177f1-c893-4946-b1b2-14bf4bfda167",
      tags: ["tesla"],
      topic:
        "Wanna be updated with Tesla and don't want to miss any Elon's post? Subscribe to that topic so we will notify you when it happens!",
    },
  ];
  return (
    <Flex justifyContent="space-evenly" flexWrap="wrap">
      {setsList.map((set) => (
        <Set key={set.title} {...set} />
      ))}
    </Flex>
  );
};

export default SetsList;
