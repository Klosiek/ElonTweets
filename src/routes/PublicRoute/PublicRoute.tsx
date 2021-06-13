import { useFirebase } from "providers/FirebaseProvider";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { RoutesEnum } from "shared/enums";

const PublicRoute = (props: RouteProps) => {
  const { currentUser, loading } = useFirebase();

  return !loading &&
    currentUser?.providerData[0] &&
    (["facebook.com", "twitter.com"].includes(currentUser?.providerData[0]?.providerId) ||
      currentUser?.emailVerified) ? (
    <Redirect to={RoutesEnum.Home} />
  ) : (
    <Route {...props} />
  );
};

export default PublicRoute;
