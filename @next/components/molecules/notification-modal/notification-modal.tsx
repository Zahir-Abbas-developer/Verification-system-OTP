import { CustomModel } from '@atoms';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { notificationBell } from '@icons';
import Image from 'next/image';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export function NotificationModal({ message, noticeType, name }: any) {
  const [open, setOpen] = useState(false);

  const getMessage: any = (noticeType: any) => {

    if (noticeType === 'Forgot Password') {
      return <p>We have received your forgot password request.
        Please click the provided link below to proceed with password change.<br /><br />
        If you have not requested this action,
        please contact us at: <a style={{ color: '#6E7191' }} href="mailto:support@identitygram.co.uk">support@identitygram.co.uk</a>
        <br />Thanks, Identity Gram</p>;
    }
    if (noticeType === 'Welcome') {
      return <p>Thank you for becoming a part of Identity Gram, we
        hope you will enjoy your experience with us.
        <br /><br /> If you have not requested this action,
        please contact us at: <a style={{ color: '#6E7191' }} href="mailto:support@identitygram.co.uk">support@identitygram.co.uk</a>
        <br /> Thanks, Identity Gram</p>;
    }
    if (noticeType === 'Declined') {
      return `${name}'s verfication has been Declined`;
    }
    if (noticeType === 'Approved') {
      return `${name}'s verfication has been Approved`;
    }
    return 'Notification';
  };

  return (
    <>
      <Box sx={{ cursor: 'pointer' }} onClick={() => setOpen(true)}>
        <VisibilityOutlinedIcon />
      </Box>
      <CustomModel
        open={open}
        setOpen={setOpen}
        styleModal={{
          // minHeight: 'fit-content !important',
          height: 'fit-content !important',
          maxHeight: 350,
          width: { lg: '38%', xs: '80%' },
          //   innerHeight: '100px',
        }}
      >
        <Box sx={{ minHeight: 'fit-content' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              my: 1,
            }}
          >
            <Image src={notificationBell} alt="notificationBell" />
            <CloseOutlinedIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setOpen(false);
              }}
            />
          </Box>
          <Typography variant="h3" sx={{ color: 'primary.dark', mt: 2 }}>
            Identity Gram {noticeType}
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: 'primary.light', mt: 2, fontWeight: 400 }}
          >
            {getMessage(noticeType)}
          </Typography>
        </Box>
      </CustomModel>
    </>
  );
}
