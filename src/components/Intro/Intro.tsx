import { Button } from "@chakra-ui/button";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import { useRef, useState } from "react";

const Intro = () => {
  const [currentStep, setStep] = useState(1);
  const cancelRef = useRef(null);
  const nextStep = () => {
    setStep(currentStep + 1);
  };
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={() => null}
        leastDestructiveRef={cancelRef}
        isOpen={currentStep === 1}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent w="300px" pos="absolute" left="10px" top="10px">
          <AlertDialogHeader>Get into!</AlertDialogHeader>
          <AlertDialogBody>Turn on notifications in your browser to fully use Filtrelon!</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={nextStep}>
              Next
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        motionPreset="slideInBottom"
        onClose={() => null}
        leastDestructiveRef={cancelRef}
        isOpen={currentStep === 2}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent w="300px" pos="absolute" right="10px" top="10px">
          <AlertDialogHeader>Darkmode</AlertDialogHeader>
          <AlertDialogBody>Click settings icon and set your favourite theme!</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={nextStep}>
              Next
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        motionPreset="slideInBottom"
        onClose={() => null}
        leastDestructiveRef={cancelRef}
        isOpen={currentStep === 3}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent w="400px">
          <AlertDialogHeader>Try it out!</AlertDialogHeader>
          <AlertDialogBody>
            Go to "Overview" and set specific tags or checkout "Sets" and discover already made tag sets to follow!
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={nextStep}>
              Next
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Intro;
