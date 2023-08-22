import React, { useState } from 'react';
import { AddVerificationMolByClient } from '@molecules';
import { CustomButton, CustomModel } from '@atoms';
import { GetVerifiedMolecule } from '@molecules';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import { REQUEST_STATUS } from '@constants';
import { endpoints } from '@config';
import { apiPostRequest } from '@helpers';
import { useSnackbar } from 'notistack';

export const VerificationByClientOrg = ({ publicKey, containerId }: any) => {
  const [open, setOpen] = React.useState(false);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.IDEL);
  const [verificationResponseData, setVerificationResponseData] = useState<any>(
    {},
  );
  const { enqueueSnackbar } = useSnackbar();

  const modalCloseHandler = () => {
    setOpen(false);
    setVerificationResponseData({});
  };

  const handleFormSubmit = async (values: any) => {
    setRequestStatus(REQUEST_STATUS?.LOADING);
    const payload = { ...values, publicKey: publicKey };
    try {
      const res: any = await apiPostRequest(
        endpoints?.addVerificationByClient,
        payload,
      );
      const { data, status } = res;
      switch (status) {
        case 201:
          setRequestStatus(REQUEST_STATUS?.SUCCESS);
          setVerificationResponseData(data?.data);
          enqueueSnackbar(data?.message, {
            variant: 'success',
          });
          break;
      }
    } catch (error: any) {
      setRequestStatus(REQUEST_STATUS?.FAILURE);
    } finally {
      setRequestStatus(REQUEST_STATUS?.IDEL);
    }
  };

  return (
    <div id={containerId}>
      <CustomButton
        type="submit"
        padding="10px 15px"
        maxWidth="200px"
        onClick={() => setOpen(true)}
      >
        <Typography
          variant="h6"
          sx={{
            transition: 'all .2s ease-in-out',
            display: 'flex',
            fontWeight: 400,
            '& span': {
              display: 'flex',
              '& :hover': {
                transform: 'scale(1.3)',
              },
            },
          }}
        >
          Start Verification
        </Typography>
      </CustomButton>
      <CustomModel
        open={open}
        setOpen={setOpen}
        styleModal={{
          width: { xs: '90%', sm: '80%', md: '70%', xl: '65%' },
          py: 4,
          overflowY: 'auto',
          height: { xs: 600, lg: 'auto' },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography
              sx={{
                color: 'primary.dark',
                fontSize: '24px',
                fontWeight: 500,
              }}
            >
              {Object?.keys(verificationResponseData)?.length > 0
                ? 'Generate a new verification'
                : "Let's get you verified "}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'end' }}>
            <CloseIcon
              sx={{
                fontFamily: 'Poppins',
                color: 'primary.light',
                fontSize: '24px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              onClick={modalCloseHandler}
            />
          </Grid>
          {Object?.keys(verificationResponseData)?.length > 0 ? (
            <GetVerifiedMolecule
              verificationResponseData={verificationResponseData}
            />
          ) : (
            <AddVerificationMolByClient
              handleFormSubmit={handleFormSubmit}
              isLoading={requestStatus === REQUEST_STATUS?.LOADING}
            />
          )}
        </Grid>
      </CustomModel>
    </div>
  );
};
