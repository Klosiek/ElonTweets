import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { ColorModeSwitcher } from "ColorModeSwitcher";
import { useColorModeValue as mode } from "@chakra-ui/color-mode";
import { useFirebase } from "providers/FirebaseProvider";
import { useHistory } from "react-router";
import { useState } from "react";
import { RoutesEnum } from "shared/enums";
import ParseErrorMessage from "shared/ParseErrorMessage";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("The email is incorrect").required(),
});

const ForgotPassword = () => {
  const { resetUserPassword } = useFirebase();
  const [errors, setErrors] = useState({ email: "" });
  const [email, setEmail] = useState<string>("");
  const history = useHistory();
  const toast = useToast();

  const validateAndSendEmail = () => {
    validationSchema
      .isValid({
        email,
      })
      .then((valid) => {
        if (valid) {
          resetUserPassword(email)
            .then(() => {
              toast({
                description: "Email was Sent! Check your mailbox and follow next steps",
                isClosable: true,
                status: "success",
                onCloseComplete: () => history.push(RoutesEnum.Login),
              });
            })
            .catch((err) => {
              toast({
                description: ParseErrorMessage(err),
                isClosable: true,
                status: "success",
                onCloseComplete: () => history.push(RoutesEnum.Login),
              });
            });
          setEmail("");
        } else setErrors({ email: "The email is incorrect" });
      })
      .catch((err) => {
        setErrors(err.errors);
      });
  };

  return (
    <>
      <Flex w="100%" justifyContent="flex-end">
        <ColorModeSwitcher m="0.5" mb={0} />
      </Flex>
      <Flex flexDir="column" rounded="lg" shadow="lg" maxW="xl" mx="auto" p={12} bg={mode("panelLight", "panelDark")}>
        <FormControl h="140px" isInvalid={!!errors.email}>
          <FormLabel>Email address</FormLabel>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            isInvalid={!!errors.email}
            errorBorderColor="red.300"
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <Button onClick={() => validateAndSendEmail()} colorScheme="blue" size="lg" fontSize="md">
          Send email
        </Button>
        <Flex color={"blue.200"} fontWeight="semibold" fontSize="sm" justifyContent="flex-end">
          <Box _hover={{ textDecoration: "underline" }} cursor="pointer" onClick={() => history.push(RoutesEnum.Login)}>
            Go back to Login!
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default ForgotPassword;
