import { InputAdornment } from '@material-ui/core';
import { Lock } from '@material-ui/icons';
import React from 'react';
import FormTextField from 'components/form-text-field';
import { Field } from './types';

const PasswordTextField = () => (
  <FormTextField
    name={Field.Password}
    type="password"
    label="Password"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Lock />
        </InputAdornment>
      ),
    }}
  />
);

export default PasswordTextField;
