import { Switch } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import { RoutesEnum } from "shared/enums";
import PrivateRoute from "./PrivateRoute";
import HomePage from "pages/HomePage";
import PublicRoute from "./PublicRoute";
import { useFirebase } from "providers/FirebaseProvider";
import { CircularProgress } from "@chakra-ui/progress";
import { Flex } from "@chakra-ui/layout";

const Routes = () => {
  const { loading } = useFirebase();
  return loading ? (
    <Flex h="100vh" justifyContent="center" alignItems="center">
      <CircularProgress isIndeterminate color="green.300" />
    </Flex>
  ) : (
    <Switch>
      <PublicRoute path={RoutesEnum.Login} component={LoginPage} exact />
      <PublicRoute path={RoutesEnum.Register} exact />
      <PrivateRoute component={HomePage} exact />
    </Switch>
  );
};

export default Routes;
