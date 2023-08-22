import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import { UserNameProps } from './user-name.types';
import { userAvatar } from '@icons';

export const UserName = ({
  image,
  name,
  email,
  borderRadius = '50px',
  height = '42px',
  width = '42px',
  marginRight = '8px',
  styleName,
}: UserNameProps): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Image
        src={image || userAvatar}
        alt="Image"
        width={42}
        height={42}
        style={{ height: height, width: width, borderRadius: borderRadius, marginRight: marginRight }}
      />
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
            width: 'max-content',
            color: 'primary.dark',
            ...styleName,
          }}
        >
          {name}
        </Typography>
        {email && (
          <Typography
            variant="h6"
            sx={{ fontWeight: 400, color: 'secondary.main' }}
          >
            {email}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
