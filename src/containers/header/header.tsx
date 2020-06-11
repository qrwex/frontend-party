import React, { MouseEvent } from 'react';
import {
  Button, Grid, makeStyles, Theme,
} from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { connect, MapDispatchToPropsParam } from 'react-redux';
import * as authActions from 'store/modules/authentication/actions';
import logo from 'assets/img/logo.svg';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Paths } from 'shared/constants';

type Props = {
  actions: {
    auth: typeof authActions;
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  logo: {
    height: 30,
  },
}));

const Header = (props: Props) => {
  const { actions } = props;
  const classes = useStyles();

  const handleClick: React.EventHandler<MouseEvent> = () => {
    actions.auth.logout();
  };

  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <Link to={Paths.Home}>
          <img src={logo} alt="" className={classes.logo} />
        </Link>
      </Grid>
      <Grid item>
        <Button startIcon={<ExitToApp />} size="large" variant="text" onClick={handleClick}>
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};

type TDispatchProps = Pick<Props, 'actions'>;
type TInnerProps = TDispatchProps;
type TOwnProps = Omit<Props, keyof TInnerProps>;

const mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps> = (dispatch) => ({
  actions: {
    auth: bindActionCreators(authActions, dispatch),
  },
});

export default connect(null, mapDispatchToProps)(Header);
