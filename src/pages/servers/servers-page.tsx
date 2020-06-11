import React, { useEffect } from 'react';
import {
  Grid, makeStyles, Theme, Typography,
} from '@material-ui/core';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { getAll } from 'store/modules/servers/actions';
import FullScreenSpinner from 'components/full-screen-spinner';
import ServersTable from 'components/servers-table';
import Header from 'containers/header';
import { Servers as $Servers } from 'shared/types/servers';
import { State } from 'store';

type Props = {
  getServers: typeof getAll;
  servers: $Servers | null;
  isLoading: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const ServersPage = (props: Props) => {
  const { getServers, servers, isLoading } = props;
  const classes = useStyles();

  useEffect(() => {
    if (!servers) {
      getServers();
    }
  });

  return isLoading ? (
    <FullScreenSpinner />
  ) : (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Header />
        {
          servers ? (
            <ServersTable servers={servers} />
          ) : (
            <Typography>No servers found.</Typography>
          )
        }
      </Grid>
    </div>
  );
};

type TStateProps = Pick<Props, 'servers' | 'isLoading'>;
type TDispatchProps = Pick<Props, 'getServers'>;
type TInnerProps = TStateProps & TDispatchProps;
type TOwnProps = Omit<Props, keyof TInnerProps>;

const mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State> = (state) => ({
  servers: state.servers.all,
  isLoading: state.servers.loading,
});

const mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps> = ({
  getServers: getAll,
});

export default connect(mapStateToProps, mapDispatchToProps)(ServersPage);
