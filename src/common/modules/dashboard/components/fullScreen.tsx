import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { Maximize1 } from 'iconsax-react';
import IconButton from 'common/components/button/iconButton';

export default function FullScreen() {
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
    if (document && !document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }, []);

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        onClick={handleToggle}
      >
        <Tooltip title={open ? 'Exit Fullscreen' : 'Fullscreen'}>
          <Maximize1 variant="Bulk" {...(open && { style: { transform: 'rotate(180deg)' } })}
            size={24}
          />
        </Tooltip>
      </IconButton>
    </Box>
  );
}
