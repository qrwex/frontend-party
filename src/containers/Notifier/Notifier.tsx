import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { clearMessage } from 'store/modules/notification/actions';
import { State } from 'store';
import { Message } from 'store/modules/notification/types';

const useStyles = makeStyles((theme: Theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

type Props = {
  message: Message | null;
  onClose: typeof clearMessage;
}

const Notifier = (props: Props) => {
  const { message, onClose } = props;

  const classes = useStyles();

  const handleClose: SnackbarProps['onClose'] = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
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
type TDispatchProps = Pick<Props, 'onClose'>;
type TInnerProps = TStateProps & TDispatchProps;
type TOwnProps = Omit<Props, keyof TInnerProps>;

const mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State> = (state) => ({
  message: state.notification.message,
});

const mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps> = ({
  onClose: clearMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifier);
