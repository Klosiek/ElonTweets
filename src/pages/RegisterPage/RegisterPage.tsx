import { Button, IconButton } from "@chakra-ui/button";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import * as Yup from "yup";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { ColorModeSwitcher } from "ColorModeSwitcher";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useColorModeValue as mode } from "@chakra-ui/color-mode";
import { useState } from "react";
import { useFirebase } from "providers/FirebaseProvider";
import { useFormik } from "formik";
import { useToast } from "@chakra-ui/toast";
import { RoutesEnum } from "shared/enums";
import { useHistory } from "react-router";
import ParseErrorMessage from "shared/ParseErrorMessage";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("The email is incorrect").required("Please enter your email"),
  password: Yup.string().min(6, "Password should be at least 6 characters long").required("Please enter your password"),
  repeatPassword: Yup.string()
    .min(6, "Password should be at least 6 characters long")
    .required("Please repeat your password"),
});

const RegisterPage = () => {
  const history = useHistory();
  const [isVisible, setVisible] = useState<Boolean>(false);
  const toast = useToast();
  const { register } = useFirebase();
  const { setFieldValue, errors, validateField, validateForm, isValid, submitForm } = useFormik<{
    email: string;
    password: string;
    repeatPassword: string;
  }>({
    initialValues: { email: "", password: "", repeatPassword: "" },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      validateForm();
      if (isValid) {
        register(values.email, values.password)
          .then((res) => {
            res.user
              ?.sendEmailVerification()
              .then(() => {
                toast({
                  description: "You have to confirm your email adress before loggin in",
                  isClosable: true,
                  status: "success",
                  onCloseComplete: () => history.push(RoutesEnum.Login),
                });
              })
              .catch((err) => {
                toast({
                  description: ParseErrorMessage(err),
                  isClosable: true,
                  status: "error",
                });
              });
          })
          .catch((err) => {
            toast({
              description: ParseErrorMessage(err),
              isClosable: true,
              status: "error",
            });
          });
      }
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFieldValue(e.target.id, e.target.value, false).then(() => {
      validateField(e.target.id);
    });
  };
  return (
    <>
      <Flex w="100%" justifyContent="flex-end">
        <ColorModeSwitcher m="0.5" mb={0} />
      </Flex>
      <Flex>
        <Box rounded="lg" shadow="lg" maxW="xl" mx="auto" p={12} bg={mode("panelLight", "panelDark")}>
          <Flex justifyContent="space-between" flexDir="column" h="xl">
            <Box>
              <Heading textAlign="left" size="md">
                Filtrelon
              </Heading>
              <Box>
                <Heading textAlign="center" fontWeight="extrabold" size="xl">
                  Welcome to Filtrelon
                </Heading>
                <Heading color="secondaryTextDark" textAlign="left" size="sm">
                  Enter your info to get started
                </Heading>
              </Box>
            </Box>
            <Flex justifyContent="space-between" flexDir="column" h="280px">
              <FormControl h="140px" isInvalid={!!errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  id="email"
                  onChange={onChange}
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
              <FormControl h="140px" isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputRightElement>
                    <IconButton
                      bg="transparent"
                      variant="ghost"
                      aria-label={isVisible ? "Mask password" : "Reveal password"}
                      icon={isVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                      onClick={() => setVisible(!isVisible)}
                    />
                  </InputRightElement>
                  <Input
                    id="password"
                    onChange={onChange}
                    placeholder="Password"
                    name="password"
                    type={isVisible ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    isInvalid={!!errors.password}
                    errorBorderColor="red.300"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Repeat assword</FormLabel>
                <InputGroup>
                  <InputRightElement>
                    <IconButton
                      bg="transparent"
                      variant="ghost"
                      aria-label={isVisible ? "Mask password" : "Reveal password"}
                      icon={isVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                      onClick={() => setVisible(!isVisible)}
                    />
                  </InputRightElement>
                  <Input
                    id="repeatPassword"
                    onChange={onChange}
                    placeholder="Repeat password"
                    name="repeatPassword"
                    type={isVisible ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    isInvalid={!!errors.repeatPassword}
                    errorBorderColor="red.300"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.repeatPassword}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex flexDir="column">
              <Button onClick={submitForm} colorScheme="blue" size="lg" fontSize="md" disabled={!isValid}>
                Sign in
              </Button>
              <Flex color={"blue.200"} fontWeight="semibold" fontSize="sm" justifyContent="flex-end">
                <Box
                  _hover={{ textDecoration: "underline" }}
                  cursor="pointer"
                  onClick={() => history.push(RoutesEnum.Login)}
                >
                  Already have an account?
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default RegisterPage;
