import { CustomButton } from '@atoms';
import { endpoints } from '@config';
import { REQUEST_STATUS } from '@constants';
import { apiPatchRequest } from '@helpers';
import { useAppSelector } from '@hooks';
import { VerificationOnFail } from '@molecules';
import { Box, Grid, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';

function WebcamImage({ sendRequestSatus }: any) {
  const { enqueueSnackbar } = useSnackbar();
  const { verifcationProccessResponseData } = useAppSelector(
    (store) => store.verification,
  );
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [loading, setLoading] = useState<boolean>(true);
  const [isAllowed, setIsAllowed] = useState<number>(1);
  const [facingMode, setFacingMode] = useState('environment');
  const [requestStatusGet, setRequestStatusGet] = useState(REQUEST_STATUS.IDEL);
  const [responseMessage, setResponseMessage] = useState<any>({
    error: null,
    message: null,
  });
  const [img, setImg] = useState<any>(null);
  const webcamRef = useRef<any>(null);
  const FRAME_WIDTH = 350;
  const FRAME_HEIGHT = 350;
  console.log(webcamRef);

  useEffect(() => {
    const timeout: any = setTimeout(() => {
      setIsAllowed(2);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isAllowed, loading]);

  // api request to check the image
  const getImageHandler = async (image: any) => {
    setRequestStatusGet(REQUEST_STATUS.LOADING);
    const payload = {
      integrationId: verifcationProccessResponseData?.integrationId,
      verificationId: verifcationProccessResponseData?._id,
      userImage: image,
    };
    try {
      const res: any = await apiPatchRequest(
        endpoints.uploadSelfie,
        payload,
        null,
        'multipart/form-data',
      );
      const { data, status } = res;
      switch (status) {
        case 200:
        case 201:
          enqueueSnackbar(data?.message, {
            variant: 'success',
          });
          setRequestStatusGet(REQUEST_STATUS.SUCCESS);
          sendRequestSatus(REQUEST_STATUS.SUCCESS);
          // stream?.getTracks().forEach((track) => {
          //   track.stop();
          // });
          // if (videoRef.current) {
          //   videoRef.current.srcObject = null;
          // }
          break;
        default:
          setResponseMessage({ error: true, message: data?.message });
          setRequestStatusGet(REQUEST_STATUS.FAILURE);
          // enqueueSnackbar(data?.message, {
          //   variant: 'error',
          // });
          break;
      }
    } catch (error: any) {
      setResponseMessage({ error: true, message: error });
      setRequestStatusGet(REQUEST_STATUS.FAILURE);
    }
  };

  // api request to check the image

  const tryAgainHandler = () => {
    setRequestStatusGet(REQUEST_STATUS.IDEL);
    // handleStartCapture();
  };

  // function the send the capture image for verificaton
  // const videoConstraints = {
  //   width: 420,
  //   height: 420,
  //   facingMode: 'environment',
  // };

  const capture = useCallback(() => {
    // if (webcamRef.current?.getScreenshot) {
    //   const imageSrc = webcamRef.current.getScreenshot?.();
    //   if (imageSrc) {
    //     setImg(imageSrc);
    //   }
    // }
    const canvas = document.createElement('canvas');
    canvas.width = FRAME_WIDTH;
    canvas.height = FRAME_HEIGHT;
    const ctx = canvas.getContext('2d');
    const video = webcamRef.current?.video;
    if (!ctx || !video) {
      return;
    }
    const x = (video.videoWidth - FRAME_WIDTH) / 2;
    const y = (video.videoHeight - FRAME_HEIGHT) / 2;
    ctx.drawImage(
      video,
      x,
      y,
      FRAME_WIDTH,
      FRAME_HEIGHT,
      0,
      0,
      FRAME_WIDTH,
      FRAME_HEIGHT,
    );

    const imageSrc = canvas.toDataURL();
    const base64Image = imageSrc.split(',')[1];
    const byteCharacters = atob(base64Image);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: 'image/jpeg' });
    const blobUrl = URL.createObjectURL(blob);
    getImageHandler(blob);
    setImg(imageSrc);
  }, [webcamRef]);

  const toggleCamera = () => {
    setFacingMode((prevMode) =>
      prevMode === 'environment' ? 'user' : 'environment',
    );
  };
  const handleUserMediaError = React.useCallback(() => {
    // No camera available, display an alert or handle it in any other way
    enqueueSnackbar('Camera not working', { variant: 'error' });
    // router.push('/app/camera-error');
  }, []);
  if (requestStatusGet === 'failure')
    return (
      <VerificationOnFail
        tryAgain={tryAgainHandler}
        documentImage={img}
        responseMessage={responseMessage}
        styleImage={{
          borderRadius: '50%',
          width: { xs: 200, lg: 300 },
          height: { xs: 200, lg: 300 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    );
  if (requestStatusGet === 'loading')
    return (
      <Grid container sx={{ pt: 3 }}>
        <Grid
          item
          xs={11}
          md={8}
          lg={7}
          xl={5}
          sx={{
            minHeight: '550px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
          }}
          className="loading-animation-upload"
        >
          <Box
            className="spinner spinner--steps icon-spinner"
            aria-hidden="true"
          ></Box>
        </Grid>
      </Grid>
    );
  return (
    <>
      <Grid container sx={{ pt: 3 }}>
        {loading && isAllowed === 1 ? (
          <Grid
            item
            xs={11}
            md={8}
            lg={7}
            xl={5}
            className="circle-selfie"
            sx={{
              background: 'black',
              margin: 'auto',
              minHeight: '550px',
              borderRadius: '30px',
              boxShadow: '0px 64px 96px rgba(60, 52, 126, 0.05)',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              className="circle"
              sx={{
                height: { xs: '200px', sm: '250px', md: '350px' },
                width: { xs: '200px', sm: '250px', md: '350px' },
              }}
            ></Box>
          </Grid>
        ) : (
          isAllowed === 2 && (
            <Grid
              item
              xs={11}
              md={8}
              lg={7}
              xl={5}
              sx={{
                position: 'relative',
                background: 'black',
                margin: 'auto',
                minHeight: '550px',
                borderRadius: '30px',
                boxShadow: '0px 64px 96px rgba(60, 52, 126, 0.05)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                flexDirection: { xs: 'column', lg: 'none' },
                justifyContent: { xs: 'space-evenly', lg: 'center' },
              }}
            >
              <Box
                sx={{
                  display: { lg: 'none' },
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  zIndex: 1,
                }}
              >
                <CustomButton
                  width="40px"
                  height="40px"
                  onClick={toggleCamera}
                  borderRadius="50px"
                  styleCustomButton={{ minWidth: 0 }}
                >
                  <FlipCameraIosIcon sx={{ fontSize: 20 }} />
                </CustomButton>
              </Box>
              <Box sx={{ position: 'relative' }}>
                <Webcam
                  audio={false}
                  mirrored={true}
                  height={500}
                  width={isMobile ? 400 : 600}
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  videoConstraints={{ facingMode }}
                  onUserMediaError={handleUserMediaError}
                />

                <Box
                  className="frame circle-selfie-active"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <Box
                    className="circle"
                    sx={{
                      height: { xs: '250px', sm: '350px' },
                      width: { xs: '250px', sm: '350px' },
                    }}
                  ></Box>
                </Box>
              </Box>
            </Grid>
          )
        )}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
        <CustomButton
          maxWidth="330px"
          width="330px"
          padding="10px"
          disabled={isAllowed === 1 ? true : false}
          onClick={capture}
        >
          <Typography
            variant="h6"
            sx={{
              transition: 'all .2s ease-in-out',
              display: 'flex',
              fontWeight: 400,
            }}
          >
            Take a photo
          </Typography>
        </CustomButton>
      </Box>
    </>
  );
}

export default WebcamImage;
