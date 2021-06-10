import { Flex } from "@chakra-ui/layout";
import Set from "components/Set";
import * as sharedTypes from "shared/types";

const SetsList = () => {
  const setsList: sharedTypes.Set[] = [
    {
      title: "Crypto",
      img: "https://cdn.pixabay.com/photo/2019/06/23/19/15/bitcoin-4294492_1280.png",
      tags: ["bitcoin"],
      topic:
        "Wanna be updated on Cryptospace and don't want to miss any Elon's post? Subscribe to that topic so we will notify you when it happens!",
    },
    {
      title: "SpaceX",
      img: "https://bloximages.chicago2.vip.townnews.com/wacotrib.com/content/tncms/assets/v3/editorial/5/47/547d2f0e-b222-11e3-be8d-0019bb2963f4/532e2b45e8b23.preview-500.png?crop=500%2C500%2C0%2C1&resize=1200%2C1200&order=crop%2Cresize",
      tags: ["spacex"],
      topic:
        "Wanna be updated with SpaceX and don't want to miss any Elon's post? Subscribe to that topic so we will notify you when it happens!",
    },
    {
      title: "Tesla",
      img: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
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
