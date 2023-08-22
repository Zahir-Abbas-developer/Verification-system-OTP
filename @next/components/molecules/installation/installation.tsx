import React, { useEffect, useState } from 'react';
import { CustomButton, CustomTextField } from '@atoms';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Grid,
  IconButton,
  SvgIcon,
  Switch,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { rightArrow } from '@icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import CopyToClipboard from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';

let defaultValues = {
  firstName: '',
  lastName: '',
  orderName: '',
};

function generateCodeSnippet(apiKey: string, containerId: any) {
  const code = `
    <div id="root"></div>
    <script src="https://cdn.identitygram.co.uk/ig.min.js"></script>
    <link href="https://cdn.identitygram.co.uk/ig.min.css" rel="stylesheet"></link>
    <div style="display: none" id="containerId">${containerId}</div>
    <div style="display: none" id="publicKey">${apiKey}</div>
  `;
  return code;
}

export const InstallationMol = ({ apiKey }: any) => {
  const [name, setName] = useState(true);
  const [uniqueIdentity, setUniqueIdentity] = useState(true);
  const [copied, setCopied] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    // resolver: yupResolver(""),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: any) => {};

  useEffect(() => {
    let interval = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(interval);
  }, [copied]);

  return (
    <Grid container mt={3}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ pr: 2, borderRight: '1px solid #E8E8EC' }}
      >
        <Typography
          variant="h3"
          sx={{ color: 'primary.dark', fontWeight: 600 }}
        >
          Install Identity Gram
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'primary.light', textTransform: 'capitalize', mt: 2 }}
        >
          Names Helps You Distinguish Between Different Integrations
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            mt: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: 'primary.dark', fontWeight: 600 }}
          >
            First And Last Names
          </Typography>
          <Switch
            size="small"
            checked={name}
            onChange={(event) => setName(event.target.checked)}
          />
        </Box>
        <Typography
          variant="h6"
          sx={{ color: 'primary.light', textTransform: 'capitalize' }}
        >
          Select if you would like users to enter their first and last name
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: 'primary.dark',
              fontWeight: 600,
            }}
          >
            Unique Identifier
          </Typography>
          <Switch
            size="small"
            checked={uniqueIdentity}
            onChange={(event) => setUniqueIdentity(event.target.checked)}
          />
        </Box>
        <Typography
          variant="h6"
          sx={{ color: 'primary.light', textTransform: 'capitalize' }}
        >
          Select if you you would like users to enter a unique identifier.
        </Typography>
        <Box
          sx={{
            border: '1px solid #E8E8EC',
            backdropFilter: 'blur(17.5px)',
            borderRadius: '12px',
            mt: 4,
          }}
          p={3}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} p={2}>
                <Typography
                  variant="h4"
                  sx={{ color: 'primary.dark', fontWeight: 600 }}
                >
                  Verification Process
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'primary.light',
                    textTransform: 'capitalize',
                    mt: 1,
                  }}
                >
                  Names helps you distinguish between different Integrations.
                </Typography>
              </Grid>
              {name && (
                <>
                  <Grid item xs={12} md={6}>
                    <CustomTextField
                      type="text"
                      name={'firstName'}
                      id="firstName"
                      control={control}
                      fullWidth
                      labelText={'First Name'}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextField
                      type="text"
                      name={'lastName'}
                      id="lastName"
                      control={control}
                      fullWidth
                      labelText={'Last Name'}
                    />
                  </Grid>
                </>
              )}
              {uniqueIdentity && (
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    type="text"
                    name={'orderName'}
                    id="orderName"
                    control={control}
                    labelText={'Unique Identifier'}
                    fullWidth
                  />
                </Grid>
              )}
              <Grid item xs={12} mt={3}>
                <CustomButton
                  type="submit"
                  fullWidth
                  loading={isSubmitting}
                  disabled={name || uniqueIdentity ? false : true}
                  EndIcon={<Image src={rightArrow} alt="rightArrow" />}
                >
                  Get Verfied
                </CustomButton>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} p={2}>
        <CopyToClipboard
          text={generateCodeSnippet(apiKey, 'containerId')}
          onCopy={() => setCopied(true)}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'end',
            }}
          >
            <IconButton
              edge="end"
              onClick={() => setCopied(true)}
              sx={{ position: 'relative', top: 50, mr: 1 }}
            >
              <SvgIcon>{copied ? <DoneIcon /> : <ContentCopyIcon />}</SvgIcon>
            </IconButton>
            <SyntaxHighlighter
              language="json"
              customStyle={{
                backgroundColor: '#f7f7f7',
                width: '100%',
                borderRadius: '8px',
              }}
            >
              {generateCodeSnippet(apiKey, 'containerId')}
            </SyntaxHighlighter>
          </Box>
        </CopyToClipboard>
      </Grid>
    </Grid>
  );
};
