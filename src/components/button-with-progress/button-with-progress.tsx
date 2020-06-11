import { Button, CircularProgress } from '@material-ui/core';
import React from 'react';
import { ButtonProps } from '@material-ui/core/Button';

export type Props = ButtonProps & {
  isLoading: boolean;
}

const ButtonWithProgress = (props: Props) => {
  const {
    isLoading, disabled, children, ...rest
  } = props;

  return (
    <Button disabled={disabled || isLoading} {...rest}>
      {
        isLoading
          ? (<CircularProgress size={26} />) : children
      }
    </Button>
  );
};

export default ButtonWithProgress;
