import { useFirebase } from "providers/FirebaseProvider";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { RoutesEnum } from "shared/enums";

const PrivateRoute = (props: RouteProps) => {
  const { currentUser, loading } = useFirebase();

  return !loading &&
    !currentUser?.emailVerified &&
    currentUser?.providerData[0]?.providerId !== ("facebook.com" || "twitter.com") ? (
    <Redirect to={RoutesEnum.Login} />
  ) : (
    <Route {...props} />
  );
};

export default PrivateRoute;
