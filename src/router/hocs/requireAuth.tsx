import React, { useEffect } from 'react';
import { connect, MapDispatchToPropsParam } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as authActions from 'store/modules/authentication/actions';
import { getStoredAuthToken } from 'store/modules/authentication/helpers';
import { Paths } from 'shared/constants';
import { bindActionCreators } from 'redux';

const requireAuth = (WrappedComponent: React.ComponentType<RouteComponentProps>) => {
  type Props = RouteComponentProps & {
    isAuthenticated: boolean;
    actions: {
      auth: typeof authActions;
    };
  }

  const RequireAuth = (props: Props) => {
    const { isAuthenticated, actions, ...routeProps } = props;

    useEffect(() => {
      if (!isAuthenticated) {
        const token = getStoredAuthToken();
        if (!token) {
          routeProps.history.push(Paths.Home);
          return;
        }
        actions.auth.initTokenStorage({ token });
      }
    });

    return isAuthenticated ? <WrappedComponent {...routeProps} /> : null;
  };

  const mapStateToProps = (state: any) => ({
    isAuthenticated: !!state.authentication.token,
  });

  type TStateProps = Pick<Props, 'isAuthenticated'>;
  type TDispatchProps = Pick<Props, 'actions'>;
  type TInnerProps = TStateProps & TDispatchProps;
  type TOwnProps = Omit<Props, keyof TInnerProps>;

  const mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps> = (dispatch) => ({
    actions: {
      auth: bindActionCreators(authActions, dispatch),
    },
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(RequireAuth));
};

export default requireAuth;
