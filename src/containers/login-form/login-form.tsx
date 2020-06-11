import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Form, Formik, FormikConfig } from 'formik';
import { InferType, object, string } from 'yup';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import * as authActions from 'store/modules/authentication/actions';
import { State } from 'store';
import ButtonWithProgress from 'components/button-with-progress';
import { bindActionCreators } from 'redux';
import UsernameTextField from './username-text-field';
import PasswordTextField from './password-text-field';
import { Field } from './types';

const validationSchema = object()
  .shape({
    [Field.Username]: string().trim().required('Enter an email'),
    [Field.Password]: string().trim().required('Enter a password'),
  });

export type FormShape = InferType<typeof validationSchema>

const useStyles = makeStyles(({
  root: {
    maxWidth: 360,
  },
}));

type Props = {
  actions: {
    auth: typeof authActions;
  };
  isLoading: boolean;
}

const LoginForm = (props: Props) => {
  const classes = useStyles();
  const { actions, isLoading } = props;

  const initialValues = {
    [Field.Username]: '',
    [Field.Password]: '',
  };

  const handleSubmit: FormikConfig<FormShape>['onSubmit'] = async (values) => {
    const { [Field.Username]: username, [Field.Password]: password } = values;
    actions.auth.authorize({
      username, password,
    });
  };

  return (
    <Formik<FormShape, {}>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {
        ({ isValid }) => (
          <Form className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <UsernameTextField />
              </Grid>
              <Grid item xs={12}>
                <PasswordTextField />
              </Grid>
              <Grid item xs={12}>
                <ButtonWithProgress isLoading={isLoading} disabled={!isValid} type="submit" size="large" fullWidth>
                  Log In
                </ButtonWithProgress>
              </Grid>
            </Grid>
          </Form>
        )
      }
    </Formik>
  );
};
type TStateProps = Pick<Props, 'isLoading'>;
type TDispatchProps = Pick<Props, 'actions'>;
type TInnerProps = TStateProps & TDispatchProps;
type TOwnProps = Omit<Props, keyof TInnerProps>;

const mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State> = (state) => ({
  isLoading: state.authentication.loading,
});

const mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps> = (dispatch) => ({
  actions: {
    auth: bindActionCreators(authActions, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
