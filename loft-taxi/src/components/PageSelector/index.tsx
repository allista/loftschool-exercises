import Login from 'components/Login';
import MapView from 'components/MapView';
import Profile from 'components/Profile';
import Registration from 'components/Registration';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { PageID, pageIsSelectable } from 'shared';
import { isLoggedIn } from 'store/selectors';
import NotFoundPage from 'components/NotFoundPage';

const PageRoute: FC<RouteProps> = ({ children, location, ...routeProps }) => {
  const loggedIn = useSelector(isLoggedIn);
  return (
    <Route {...routeProps} location={location}>
      {location && pageIsSelectable(loggedIn, location.pathname as PageID) ? (
        children
      ) : (
        <Redirect
          to={{ pathname: loggedIn ? PageID.MAP : PageID.LOGIN, state: { from: location } }}
        />
      )}
    </Route>
  );
};

export const PageSelector: FC<RouteProps> = () => {
  return (
    <Switch>
      <Redirect exact from="/" to={PageID.LOGIN} />
      <PageRoute path={PageID.LOGIN}>
        <Login />
      </PageRoute>
      <PageRoute path={PageID.REGISTRATION}>
        <Registration />
      </PageRoute>
      <PageRoute path={PageID.PROFILE}>
        <Profile />
      </PageRoute>
      <PageRoute path={PageID.MAP}>
        <MapView />
      </PageRoute>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default PageSelector;
