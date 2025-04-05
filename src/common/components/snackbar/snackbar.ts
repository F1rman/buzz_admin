import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

export const endpoints = {
  key: 'snackbar'
};

export type SnackbarVariant = 'default' | 'alert';
export type SnackbarTransition = 'Fade' | 'Slide' | 'Grow' | string;
export type SnackbarColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export type SnackbarPosition = {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
};

export interface SnackbarAlert {
  color: SnackbarColor;
  variant: 'standard' | 'outlined' | 'filled';
}

export interface SnackbarState {
  action?: boolean;
  open: boolean;
  message: string;
  anchorOrigin: SnackbarPosition;
  variant: SnackbarVariant;
  alert?: SnackbarAlert;
  transition: SnackbarTransition;
  close?: boolean;
  actionButton?: boolean;
  maxStack?: number;
  dense?: boolean;
  iconVariant?: string;
}

const initialState: SnackbarState = {
  action: false,
  open: false,
  message: 'Note archived',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right'
  },
  variant: 'default',
  alert: {
    color: 'primary',
    variant: 'filled'
  },
  transition: 'Fade',
  close: false,
  actionButton: false,
  maxStack: 3,
  dense: false,
  iconVariant: 'usedefault'
};

export function useGetSnackbar() {
  const { data } = useSWR<SnackbarState>(endpoints.key, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(() => ({ snackbar: data ?? initialState }), [data]);

  return memoizedValue;
}

export function openSnackbar(snackbar: Partial<SnackbarState>) {
  mutate(
    endpoints.key,
    (currentSnackbar: SnackbarState = initialState) => ({
      ...currentSnackbar,
      ...snackbar,
      alert: {
        color: snackbar.alert?.color || initialState.alert!.color,
        variant: snackbar.alert?.variant || initialState.alert!.variant
      }
    }),
    false
  );
}

export function closeSnackbar() {
  mutate(
    endpoints.key,
    (currentSnackbar: SnackbarState = initialState) => ({
      ...currentSnackbar,
      open: false
    }),
    false
  );
}

export function handlerIncrease(maxStack: number) {
  mutate(
    endpoints.key,
    (currentSnackbar: SnackbarState = initialState) => ({
      ...currentSnackbar,
      maxStack
    }),
    false
  );
}

export function handlerDense(dense: boolean) {
  mutate(
    endpoints.key,
    (currentSnackbar: SnackbarState = initialState) => ({
      ...currentSnackbar,
      dense
    }),
    false
  );
}

export function handlerIconVariants(iconVariant: string) {
  mutate(
    endpoints.key,
    (currentSnackbar: SnackbarState = initialState) => ({
      ...currentSnackbar,
      iconVariant
    }),
    false
  );
}
