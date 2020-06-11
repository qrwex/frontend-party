import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import * as notificationActions from 'store/modules/notification/actions';
import { State } from 'store';
import { Message } from 'store/modules/notification/types';
import { bindActionCreators } from 'redux';

const useStyles = makeStyles((theme: Theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

type Props = {
  message: Message | null;
  actions: {
    notification: typeof notificationActions;
  };
}

const Notifier = (props: Props) => {
  const { message, actions } = props;

  const classes = useStyles();

  const handleClose: SnackbarProps['onClose'] = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    actions.notification.clearMessage();
  };

  return (
    message ? (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={(
          <span id="message-id">
            {message}
          </span>
        )}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={(event) => {
              handleClose(event, 'close');
            }}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    ) : null
  );
};

type TStateProps = Pick<Props, 'message'>;
type TDispatchProps = Pick<Props, 'actions'>;
type TInnerProps = TStateProps & TDispatchProps;
type TOwnProps = Omit<Props, keyof TInnerProps>;

const mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State> = (state) => ({
  message: state.notification.message,
});

const mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps> = (dispatch) => ({
  actions: {
    notification: bindActionCreators(notificationActions, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifier);
