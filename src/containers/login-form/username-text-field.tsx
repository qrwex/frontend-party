import { InputAdornment } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import React from 'react';
import FormTextField from 'components/form-text-field';
import { Field } from './types';

const UsernameTextField = () => (
  <FormTextField
    name={Field.Username}
    label="Username"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Person />
        </InputAdornment>
      ),
    }}
  />
);

export default UsernameTextField;
