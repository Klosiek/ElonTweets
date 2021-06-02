import { Route, Switch } from "react-router";
import LoginPage from "pages/LoginPage";
import { RoutesEnum } from "shared/enums";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path={RoutesEnum.Home} exact />
        <Route path={RoutesEnum.Login} component={LoginPage} />
      </Switch>
    </div>
  );
};

export default Routes;
