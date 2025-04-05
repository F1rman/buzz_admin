import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import { FC } from 'react';

export enum SortType {
  ASC = 'asc',
  DESC = 'desc',
}

type SortTogglerProps = {
  type?: SortType;
};

const SortToggler: FC<SortTogglerProps> = ({ type }) => {
  const theme = useTheme();

  return (
    <Stack sx={{ color: 'secondary.light' }}>
      <ArrowUp2
        size="15"
        variant="Bold"
        style={{
          fontSize: '0.625rem',
          color: type === SortType.ASC ? theme.palette.text.secondary : '#B0B0B0',
        }}
      />
      <ArrowDown2
        size="15"
        variant="Bold"
        style={{
          fontSize: '0.625rem',
          marginTop: -8,
          color: type === SortType.DESC ? theme.palette.text.secondary : '#B0B0B0'
        }}
      />
    </Stack>
  );
};

type HeaderSortProps = {
  column: {
    getToggleSortingHandler: () => () => void;
    getIsSorted: () => 'asc' | 'desc' | false;
  };
  sort?: boolean;
};

const HeaderSort: FC<HeaderSortProps> = ({ column, sort }) => {
  const sorted = column.getIsSorted();

  return (
    <Box
      {...(sort && {
        onClick: column.getToggleSortingHandler(),
        className: 'cursor-pointer prevent-select'
      })}
    >
      {sorted === 'asc' || sorted === 'desc' ? (
        {
          asc: <SortToggler type={SortType.ASC} />,
          desc: <SortToggler type={SortType.DESC} />
        }[sorted]
      ) : (
        <SortToggler />
      )}
    </Box>
  );
};

export default HeaderSort;
