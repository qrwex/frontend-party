import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { initTokenStorage } from 'store/modules/authentication/actions';
import { getStoredAuthToken } from 'store/modules/authentication/helpers';
import PATHS from 'shared/constants/PATHS';

const requireAuth = (WrappedComponent: React.ComponentType<RouteComponentProps>) => {
  type Props = RouteComponentProps & {
    isAuthenticated: boolean;
    initTokenStorage: typeof initTokenStorage;
  }

  const RequireAuth = (props: Props) => {
    const { isAuthenticated, initTokenStorage: initStorage, ...routeProps } = props;

    useEffect(() => {
      if (!isAuthenticated) {
        const token = getStoredAuthToken();
        if (!token) {
          routeProps.history.push(PATHS.HOME);
          return;
        }
        initStorage({ token });
      }
    });

    return isAuthenticated ? <WrappedComponent {...routeProps} /> : null;
  };

  const mapStateToProps = (state: any) => ({
    isAuthenticated: !!state.authentication.token,
  });

  const mapDispatchToProps = {
    initTokenStorage,
  };

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(RequireAuth));
};

export default requireAuth;
