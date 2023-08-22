import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Image from 'next/image';
import moment from 'moment';
import { useAppSelector } from '@hooks';

export const VerificationDetailAttempts = ({ responseData }: any) => {
  const { user } = useAppSelector((state: { auth: any }) => state.auth);
  let role = user?.roles?.length && user?.roles[0];

  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 600, color: 'primary.dark' }}>
        {responseData[0]?.status ?? '--'}
      </Typography>
      <Typography variant="h4" sx={{ color: 'primary.light', py: 2 }}>
        {responseData[0]?.verificationStartedAt
          ? moment(responseData[0]?.verificationStartedAt).format('lll') + ' '
          : '-'}
      </Typography>
      <Box>
        {role === 'SUPER_ADMIN' && (
          <Grid container spacing={4} sx={{ pt: 5 }}>
            <Grid item>
              <Typography variant="h5" sx={{ color: 'primary.dark' }}>
                Platform Used
              </Typography>
              <Typography variant="h4" sx={{ color: 'primary.light', pt: 1 }}>
                {responseData[0]?.platform || '--'}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" sx={{ color: 'primary.dark' }}>
                IP Location
              </Typography>
              <Typography variant="h4" sx={{ color: 'primary.light', pt: 1 }}>
                {responseData[0]?.ip || '--'}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" sx={{ color: 'primary.dark' }}>
                Device And Browser
              </Typography>
              <Typography variant="h4" sx={{ color: 'primary.light', pt: 1 }}>
                {responseData[0]?.userAgent || '--'}
              </Typography>
            </Grid>
          </Grid>
        )}
        <Grid container spacing={4} sx={{ pt: 5 }}>
          <Grid item xs={12} lg={6}>
            <Typography
              variant="h3"
              sx={{ color: 'primary.main', fontWeight: 600 }}
            >
              Personal
            </Typography>
            <Grid container spacing={4} sx={{ pt: 5 }}>
              <Grid item lg={6}>
                <Typography variant="h5" sx={{ color: 'primary.dark' }}>
                  First Name
                </Typography>
                <Typography variant="h4" sx={{ color: 'primary.light' }}>
                  {responseData[0]?.details?.name || '--'}
                </Typography>
              </Grid>
              <Grid item lg={6}>
                <Typography variant="h5" sx={{ color: 'primary.dark' }}>
                  Last Name
                </Typography>
                <Typography variant="h4" sx={{ color: 'primary.light' }}>
                  {responseData[0]?.details?.surname || '--'}
                </Typography>
              </Grid>
              <Grid item lg={6}>
                <Typography variant="h5" sx={{ color: 'primary.dark' }}>
                  Date Of Birth
                </Typography>
                <Typography variant="h4" sx={{ color: 'primary.light' }}>
                  {responseData[0]?.details?.dateOfBirth || '--'}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="h5" sx={{ color: 'primary.dark', pt: 4 }}>
              Portrait
            </Typography>
            <Box
              sx={{
                mt: 3,
                height: '258px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {responseData[0]?.selfie ? (
                <Image
                  src={`https://ig-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${responseData[0]?.selfie}`}
                  width={500}
                  height={200}
                  alt=""
                  style={{ width: 'inherit', height: 'inherit' }}
                />
              ) : (
                <Typography
                  variant="h4"
                  sx={{ color: 'primary.light', pt: 10 }}
                >
                  Image Not Uploaded Yet
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ ml: { xs: 0, lg: 8 } }}>
              <Typography
                variant="h3"
                sx={{ color: 'primary.main', fontWeight: 600 }}
              >
                Document
              </Typography>
              <Grid container spacing={4} sx={{ pt: 5 }}>
                <Grid item lg={6}>
                  <Typography variant="h5" sx={{ color: 'primary.dark' }}>
                    Location
                  </Typography>
                  <Typography variant="h4" sx={{ color: 'primary.light' }}>
                    {responseData[0]?.details?.country ||
                      responseData[0]?.details?.address ||
                      responseData[0]?.details?.placeOfBirth ||
                      '--'}
                  </Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography variant="h5" sx={{ color: 'primary.dark' }}>
                    Document Type
                  </Typography>
                  <Typography variant="h4" sx={{ color: 'primary.light' }}>
                    {responseData[0]?.documentType || '--'}
                  </Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography variant="h5" sx={{ color: 'primary.dark' }}>
                    ID Number
                  </Typography>
                  <Typography variant="h4" sx={{ color: 'primary.light' }}>
                    {responseData[0]?.details?.idNumber || '--'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Typography variant="h5" sx={{ color: 'primary.dark', pt: 4 }}>
              Document Front
            </Typography>
            <Box
              sx={{
                mt: 3,
                height: '258px',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#faf9fc',
              }}
            >
              {responseData[0]?.documentFront?.url ? (
                <Image
                  src={`https://ig-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${responseData[0]?.documentFront?.url}`}
                  alt=""
                  width={1200}
                  height={800}
                  style={{ width: 'inherit', height: 'inherit' }}
                />
              ) : (
                <Typography
                  variant="h4"
                  sx={{ color: 'primary.light', pt: 10 }}
                >
                  Document Not Uploaded Yet
                </Typography>
              )}
            </Box>
          </Grid>
          {(responseData[0]?.documentType === 'License' ||
            responseData[0]?.documentType === 'Address Permit') && (
            <Grid item xs={12} lg={6}>
              <Typography variant="h5" sx={{ color: 'primary.dark', pt: 4 }}>
                Document Back
              </Typography>
              <Box
                sx={{
                  mt: 3,
                  height: '258px',
                  display: 'flex',
                  justifyContent: 'center',
                  backgroundColor: '#faf9fc',
                }}
              >
                {responseData[0]?.documentBack?.url ? (
                  <Image
                    src={`https://ig-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${responseData[0]?.documentBack?.url}`}
                    alt=""
                    width={1200}
                    height={800}
                    style={{ width: 'inherit', height: 'inherit' }}
                  />
                ) : (
                  <Typography
                    variant="h4"
                    sx={{ color: 'primary.light', pt: 10 }}
                  >
                    Document Not Uploaded Yet
                  </Typography>
                )}
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};
