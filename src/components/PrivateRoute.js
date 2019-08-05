import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...passedProps }) => {
  return (
    <Route
      render={props => {
        return passedProps.authedUser ? (
          <Component {...{ ...props, ...passedProps }} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
