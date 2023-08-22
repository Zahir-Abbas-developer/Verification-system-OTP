import React from 'react';
import { CustomButton, CustomTextField } from '@atoms';
import { Typography, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './add-verification.schema';
import { types } from './add-verification.type';

let defaultValues = {
  firstName: '',
  lastName: '',
  uniqueIdentifier: '',
};

export const AddVerificationMolByClient = ({
  handleFormSubmit,
  isLoading,
}: any) => {
  const {
    handleSubmit,
    control,
    formState: {},
  } = useForm<types>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  // get All Integration  of Values on Select Change
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2} sx={{ px: 2 }}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{
              pb: 2,
              fontWeight: 400,
              color: 'text.primary',
            }}
          >
            To authorise transactions, please scan this QR code with your Google
            Authenticator App and enter the verification code below.{' '}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            labelText="First Name"
            padding="15px"
            placeholder="Write here"
            type="text"
            name="firstName"
            id="firstName"
            control={control}
            styleTextField={{
              fontSize: '14px',
              backgroundColor: 'customShadows.primary',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            labelText="Last Name"
            padding="15px"
            placeholder="Write here"
            styleTextField={{
              fontSize: '14px',
              backgroundColor: 'customShadows.primary',
            }}
            type="text"
            name="lastName"
            id="lastName"
            control={control}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            fullWidth
            notRequired
            labelText="Unique Identifier"
            padding="15px"
            placeholder="User ID"
            styleTextField={{
              fontSize: '14px',
              backgroundColor: 'customShadows.primary',
            }}
            type="text"
            name="uniqueIdentifier"
            id="uniqueIdentifier"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
          <CustomButton
            type="submit"
            padding="10px"
            loading={isLoading}
            maxWidth="200px"
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
              Generate Verification
            </Typography>
          </CustomButton>
        </Grid>
      </Grid>
    </form>
  );
};
