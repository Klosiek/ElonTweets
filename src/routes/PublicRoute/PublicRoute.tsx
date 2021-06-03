import { useFirebase } from "providers/FirebaseProvider";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { RoutesEnum } from "shared/enums";

const PublicRoute = (props: RouteProps) => {
  const { currentUser, loading } = useFirebase();
  console.dir(currentUser);

  return !loading && currentUser ? (
    <Redirect to={RoutesEnum.Home} />
  ) : (
    <Route {...props} />
  );
};

export default PublicRoute;
