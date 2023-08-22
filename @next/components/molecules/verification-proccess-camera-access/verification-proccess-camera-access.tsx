import React, { useState } from 'react';
import { IndentityLogo } from '@icons';
import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  DocumentVerificationCamera,
  DocumentVerificationOnMobile,
  VerificationLoader,
} from '@molecules';
import { useMediaQuery } from 'react-responsive';

export const VerificationProccessCameraAccess = () => {
  const [proofAddress, setProofAddress] = useState<boolean>(false);
  const isMobile = useMediaQuery({ maxWidth: 512 });
  const isTablet = useMediaQuery({ minWidth: 513, maxWidth: 767 });
  const isLaptopDevices = useMediaQuery({ minWidth: 768 });
  const { query } = useRouter();
  if (proofAddress) return <VerificationLoader />;
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        pt: { xs: 1, md: 3 },
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Image src={IndentityLogo} alt="" priority={false} />
      </Box>

      <Typography
        sx={{
          fontSize: '24px',
          textAlign: 'center',
          fontWeight: 500,
          pt: { xs: 1, md: 3 },
          color: 'primary.dark',
        }}
      >
        Take a photo of your document
      </Typography>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          pt: { xs: 1, md: 3 },
          color: 'primary.light',
          '& span': {
            fontWeight: 500,
          },
        }}
      >
        Accepted Document Type:
        <span>
          {query?.keyword === 'Passport'
            ? ' Passport'
            : query?.keyword === 'License'
            ? ' Driving License'
            : query?.keyword === 'Address Permit'
            ? ' Accepted Document Type: Residence Permit'
            : ' Utility Bills, Bank Statements, Rental Agreement, Letter of Employment'}
        </span>
      </Typography>
      {isLaptopDevices ? (
        <DocumentVerificationCamera
          isProofAddress={(val: boolean) => setProofAddress(val)}
        />
      ) : (
        <DocumentVerificationOnMobile
          isProofAddress={(val: boolean) => setProofAddress(val)}
        />
      )}

      {/* <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
          pt: 3,
          color: 'primary.dark',
        }}
      >
        Experiencing problems?
      </Typography> */}
    </Box>
  );
};
