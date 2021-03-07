import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  const { checking, uid } = useSelector((state) => state.auth);

  if (checking) {
    return <h5>Loading .....</h5>;
  }

  return (
    <div>
      <Router>
        <div>
          <Switch>
            <PublicRoute
              exact
              path="/login"
              component={LoginScreen}
              isAuthenticated={!!uid}
            />
            <PrivateRoute
              exact
              path="/"
              component={CalendarScreen}
              isAuthenticated={!!uid}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
