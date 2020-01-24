import React from 'react';
import {
  Button, CircularProgress, Grid, InputAdornment, makeStyles,
} from '@material-ui/core';
import {
  Form, Formik, FormikProps,
} from 'formik';
import { InferType, object, string } from 'yup';
import { Lock, Person } from '@material-ui/icons';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import FormTextField from 'components/FormTextField/FormTextField';
import { init } from 'store/modules/authentication/actions';
import { createLoadingSelector } from 'store/modules/loading/selectors';
import * as AUTHENTICATION_ACTION_TYPES from 'store/modules/authentication/constants';
import { State } from 'store';
import { FIELD_LABELS, FIELDS, INITIAL_VALUES } from './constants';

const validationSchema = object()
  .shape({
    [FIELDS.USERNAME]: string().trim()
      .required('Enter an email'),
    [FIELDS.PASSWORD]: string().trim()
      .required('Enter a password'),
  });

export type FormShape = InferType<typeof validationSchema>

const useStyles = makeStyles(({
  root: {
    maxWidth: 360,
  },
}));

type Props = {
  authorize: typeof init;
  isLoading: boolean;
}

const LoginForm = (props: Props) => {
  const classes = useStyles();
  const { authorize, isLoading } = props;

  const handleSubmit = async (values: FormShape) => {
    const { [FIELDS.USERNAME]: username, [FIELDS.PASSWORD]: password } = values;
    authorize({
      username, password,
    });
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {
        (formikProps: FormikProps<FormShape>) => (
          <Form className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormTextField
                  name={FIELDS.USERNAME}
                  label={FIELD_LABELS[FIELDS.USERNAME]}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  name={FIELDS.PASSWORD}
                  type="password"
                  label={FIELD_LABELS[FIELDS.PASSWORD]}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button disabled={!formikProps.isValid || isLoading} type="submit" size="large" fullWidth>
                  {
                    isLoading ? (
                      <CircularProgress size={26} />
                    ) : 'Log In'
                  }
                </Button>
              </Grid>
            </Grid>
          </Form>
        )
      }
    </Formik>
  );
};

const loadingSelector = createLoadingSelector([
  AUTHENTICATION_ACTION_TYPES.AUTH_REQUEST,
]);

type TStateProps = Pick<Props, 'isLoading'>;
type TDispatchProps = Pick<Props, 'authorize'>;
type TInnerProps = TStateProps & TDispatchProps;
type TOwnProps = Omit<Props, keyof TInnerProps>;

const mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State> = (state) => ({
  isLoading: loadingSelector(state),
});

const mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps> = ({
  authorize: init,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
