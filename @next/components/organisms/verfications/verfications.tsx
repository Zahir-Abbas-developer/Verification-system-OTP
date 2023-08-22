import React, { useCallback, useState } from 'react';
import { AddVerificationMol } from '@molecules';
import { CustomButton, CustomModel } from '@atoms';
import { GetVerifiedMolecule } from '@molecules';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import { REQUEST_STATUS } from '@constants';
import { endpoints } from '@config';
import { apiGetRequest } from '@helpers';
import { useAppSelector } from '@hooks';

export const VerificationsOrg = ({
  handleAddVerification,
  verificationResponseData,
  setVerificationResponseData,
  isLoadingMutation,
}: any) => {
  const [open, setOpen] = React.useState(false);
  const [requestStatusGet, setRequestStatusGet] = useState(REQUEST_STATUS.IDEL);
  const [getResponseData, setGetResponseData] = useState<any>(null);

  const { user }: any = useAppSelector((state: { auth: any }) => state.auth);
  const role = user?.roles?.length && user?.roles[0];

  const getAllIntegrations = useCallback(async () => {
    setRequestStatusGet(REQUEST_STATUS.LOADING);
    try {
      const res: any = await apiGetRequest(endpoints?.getAllIntegrationS);
      const { data, status } = res;
      switch (status) {
        case 200:
          setRequestStatusGet(REQUEST_STATUS.SUCCESS);
          setGetResponseData(data?.data);
          break;
      }
    } catch (error: any) {
      setRequestStatusGet(REQUEST_STATUS.FAILURE);
    } finally {
      setRequestStatusGet(REQUEST_STATUS.IDEL);
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
    if (role !== 'SUPER_ADMIN') {
      getAllIntegrations();
    }
  };

  const modalCloseHandler = () => {
    setOpen(false);
    setVerificationResponseData({});
  };

  return (
    <React.Fragment>
      <CustomButton
        type="submit"
        padding="10px 15px"
        maxWidth="200px"
        onClick={handleOpen}
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
          Add Verification
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
              {Object.keys(verificationResponseData)?.length > 0
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
          {Object.keys(verificationResponseData)?.length > 0 ? (
            <GetVerifiedMolecule
              verificationResponseData={verificationResponseData}
            />
          ) : (
            <AddVerificationMol
              getResponseData={getResponseData}
              handleAddVerification={handleAddVerification}
              isLoadingMutation={isLoadingMutation}
              requestStatusGet={requestStatusGet}
            />
          )}
        </Grid>
      </CustomModel>
    </React.Fragment>
  );
};
