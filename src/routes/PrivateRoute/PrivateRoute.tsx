import { useFirebase } from "providers/FirebaseProvider";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { RoutesEnum } from "shared/enums";

const PrivateRoute = (props: RouteProps) => {
  const { currentUser, loading } = useFirebase();
  console.dir(currentUser);

  return !loading && !currentUser ? (
    <Redirect to={RoutesEnum.Login} />
  ) : (
    <Route {...props} />
  );
};

export default PrivateRoute;
