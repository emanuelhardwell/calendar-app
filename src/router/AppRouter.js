import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
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

export const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/" component={CalendarScreen} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
