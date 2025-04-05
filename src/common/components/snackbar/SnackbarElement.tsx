// material-ui
import React from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Slide, { SlideProps } from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import MuiSnackbar from '@mui/material/Snackbar';
import { SyntheticEvent } from 'react';

// project-imports
import { closeSnackbar, useGetSnackbar } from './snackbar';

// assets
import { Add } from 'iconsax-react';

// animation functions
function TransitionSlideLeft(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

function GrowTransition(props: SlideProps) {
  return <Grow {...props} />;
}

// animation options
const animation: Record<string, React.FC<SlideProps>> = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade
};

// ==============================|| SNACKBAR ||============================== //

export default function SnackbarElement() {
  const { snackbar } = useGetSnackbar();

  const handleClose = (event: Event | SyntheticEvent<any, Event>, reason?: string) => {
    if (reason === 'clickaway') return;
    closeSnackbar();
  };

  return (
    <>
      {/* Default Snackbar */}
      {snackbar.variant === 'default' && (
        <MuiSnackbar
          anchorOrigin={snackbar.anchorOrigin}
          open={snackbar.open}
          autoHideDuration={1500}
          onClose={handleClose}
          message={snackbar.message}
          TransitionComponent={animation[snackbar.transition] || Fade}
          action={
            <>
              <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
              </Button>
              <Button onClick={handleClose}>
                <Add style={{ transform: 'rotate(45deg)' }} />
              </Button>
            </>
          }
        />
      )}

      {/* Alert Snackbar */}
      {snackbar.variant === 'alert' && (
        <MuiSnackbar
          className="!rounded-[8px]"
          TransitionComponent={animation[snackbar.transition] || Fade}
          anchorOrigin={snackbar.anchorOrigin}
          open={snackbar.open}
          autoHideDuration={1500}
          onClose={handleClose}
        >
          <Alert
            variant={snackbar.alert?.variant}
            color={snackbar.alert?.color as AlertColor}
            action={
              <Stack direction="row" alignItems="center">
                {snackbar.actionButton !== false && (
                  <Button color={snackbar.alert?.color} size="small" onClick={handleClose}>
                    UNDO
                  </Button>
                )}
                {snackbar.close && (
                  <Button
                    onClick={handleClose}
                  >
                    <Add style={{ transform: 'rotate(45deg)' }} />
                  </Button>
                )}
              </Stack>
            }
            sx={{
              ...(snackbar.alert?.variant === 'outlined' && {
                bgcolor: 'background.default'
              })
            }}
          >
            {snackbar.message}
          </Alert>
        </MuiSnackbar>
      )}
    </>
  );
}
