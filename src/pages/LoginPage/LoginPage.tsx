import { Box, Flex, Heading } from "@chakra-ui/layout";
import { ColorModeSwitcher } from "ColorModeSwitcher";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useColorModeValue as mode } from "@chakra-ui/color-mode";
import { Button, IconButton } from "@chakra-ui/button";
import DividerWithText from "components/DividerWithText";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";
import { useFirebase } from "providers/FirebaseProvider";
import { useHistory } from "react-router";
import { RoutesEnum } from "shared/enums";
import ParseErrorMessage from "shared/ParseErrorMessage";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("The email is incorrect").required("Please enter your email"),
  password: Yup.string().required("Please enter your password"),
});

const LoginPage = () => {
  const history = useHistory();
  const [isVisible, setVisible] = useState<Boolean>(false);
  const toast = useToast();
  const { loginWithTwitter, loginWithFacebook, loginWithEmail } = useFirebase();

  const { setFieldValue, errors, validateField, validateForm, isValid, submitForm } = useFormik<{
    email: string;
    password: string;
  }>({
    initialValues: { email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      validateForm();
      if (isValid) {
        loginWithEmail(values.email, values.password).catch((err) => {
          toast({
            description: ParseErrorMessage(err),
            status: "error",
            isClosable: true,
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
            <Heading textAlign="left" size="md">
              Filtrelon
            </Heading>
            <Box>
              <Heading textAlign="center" fontWeight="extrabold" size="xl">
                Welcome to Filtrelon
              </Heading>
              <Heading color="secondaryTextDark" textAlign="left" size="sm">
                Welcome back!
              </Heading>
            </Box>
            <Button
              onClick={() =>
                loginWithTwitter().catch((err) => {
                  toast({
                    description: ParseErrorMessage(err),
                    status: "error",
                    isClosable: true,
                  });
                })
              }
              variant="outline"
            >
              <FaTwitter color="#1196F5" />
              <Box ml="15px"> Sign in with Twitter</Box>
            </Button>
            <Button
              onClick={() =>
                loginWithFacebook().catch((err) => {
                  toast({
                    description: ParseErrorMessage(err),
                    status: "error",
                    isClosable: true,
                  });
                })
              }
              variant="outline"
            >
              <FaFacebook color="#1196F5" />
              <Box ml="15px">Sign in with Facebook</Box>
            </Button>
            <DividerWithText mt="6">OR</DividerWithText>
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
                <Flex justify="space-between">
                  <FormLabel>Password</FormLabel>
                  <Box
                    onClick={() => history.push(RoutesEnum.ForgotPassword)}
                    color={mode("blue.600", "blue.200")}
                    fontWeight="semibold"
                    fontSize="sm"
                    cursor="pointer"
                  >
                    Forgot Password?
                  </Box>
                </Flex>
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
              <Button onClick={submitForm} colorScheme="blue" size="lg" fontSize="md" disabled={!isValid}>
                Sign in
              </Button>
              <Flex color={"blue.200"} fontSize="sm" justifyContent="space-between">
                <Box
                  fontWeight="thin"
                  _hover={{ textDecoration: "underline" }}
                  cursor="pointer"
                  onClick={() => history.push(RoutesEnum.PrivacyPolicy)}
                >
                  Privacy policy
                </Box>
                <Box
                  fontWeight="semi-bold"
                  _hover={{ textDecoration: "underline" }}
                  cursor="pointer"
                  onClick={() => history.push(RoutesEnum.Register)}
                >
                  Sign up!
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default LoginPage;
