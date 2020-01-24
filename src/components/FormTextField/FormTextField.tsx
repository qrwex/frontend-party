import { TextField } from '@material-ui/core';
import { FieldAttributes, useField } from 'formik';
import React from 'react';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';

type FormTextFieldProps = TextFieldProps & FieldAttributes<{}>

const FormTextField = (props: FormTextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <TextField {...field} {...props} error={meta.touched && !!meta.error} />
  );
};

export default FormTextField;
