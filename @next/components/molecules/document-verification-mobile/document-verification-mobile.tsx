import React from 'react';
import { CustomButton } from '@atoms';
import { Box, Grid, Typography } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import Image from 'next/image';
import { cameraScan, cameraIcon } from 'public/images';
import { endpoints } from '@config';
import { apiPatchRequest } from '@helpers';
import { useAppSelector } from '@hooks';
import { VerificationOnFail } from '@molecules';
import { useRouter } from 'next/router';
import { REQUEST_STATUS } from '@constants';
import Resizer from 'react-image-file-resizer';

export const DocumentVerificationOnMobile = ({ isProofAddress }: any) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const videoRef = useRef<HTMLVideoElement>(null);
  // const [facingMode, setFacingMode] = useState('environment');
  const [imageUrl, setImageUrl] = useState<any>('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [imagePass, setImagePass] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [hitsCount, setHitsCounts] = useState<any>(
    parseInt(localStorage.getItem('hitcount') || '0'),
  );
  const [isAllowed, setIsAllowed] = useState<number>(1);
  const [responseMessage, setResponseMessage] = useState<any>({
    error: null,
    message: null,
  });
  const [requestStatusGet, setRequestStatusGet] = useState(REQUEST_STATUS.IDEL);

  const { verifcationProccessResponseData } = useAppSelector(
    (store) => store.verification,
  );
  // this function refer to on success wheater it shoud move to selfie or take back of document

  const onSuccessCaseHandler = () => {
    stream?.getTracks().forEach((track: any) => {
      track.stop();
    });
    setStream(null);
    if (router.query.keyword === 'Passport') {
      router.push({
        pathname: '/app/verifications/selfie-verification',
        query: { keyword: 'selfie' },
      });
      stream?.getTracks().forEach((track: any) => {
        track.stop();
      });
      setStream(null);
    } else if (router.query.keyword === 'Proof Address') {
      isProofAddress(true);
    } else if (router.query.type === 'front') {
      router.push({
        pathname: '/app/verifications/verification-proccess',
        query: { keyword: router.query.keyword, type: 'back' },
      });
      setIsAllowed(2);
    } else {
      router.push({
        pathname: '/app/verifications/selfie-verification',
        query: { keyword: 'selfie' },
      });
      stream?.getTracks().forEach((track: any) => {
        track.stop();
      });
      setStream(null);
    }
  };
  // this function refer to on success wheater it shoud move to selfie or take back of document
  useEffect(() => {
    localStorage.setItem('hitcount', hitsCount.toString());
    return () => {
      localStorage.removeItem('hitcount');
    };
  }, [hitsCount]);

  // function the send the capture image for verificaton
  const getImageHandler = async (
    bypassVerification: boolean,
    blobImageVal: any,
  ) => {
    setRequestStatusGet(REQUEST_STATUS.LOADING);
    const payload = {
      integrationId: verifcationProccessResponseData?.integrationId,
      verificationId: verifcationProccessResponseData?._id,
      documentImage: blobImageVal,
      documentType: router.query.keyword,
      imageType: router.query.type,
      customerSaidItsOk: bypassVerification,
    };
    try {
      const res: any = await apiPatchRequest(
        endpoints?.uploadDocument,
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
          onSuccessCaseHandler();
          localStorage.removeItem('hitcount');
          setHitsCounts(0);
          break;
        default:
          setResponseMessage({ error: true, message: data?.message });
          setRequestStatusGet(REQUEST_STATUS.FAILURE);
          // enqueueSnackbar(data?.message, {
          //   variant: 'error',
          // });
          if (hitsCount !== 3) {
            setHitsCounts(hitsCount + 1);
          }
          break;
      }
    } catch (error: any) {
      if (hitsCount !== 3) {
        setHitsCounts(hitsCount + 1);
      }
      setResponseMessage({ error: true, message: error });
      setRequestStatusGet(REQUEST_STATUS.FAILURE);
      // enqueueSnackbar(error, {
      //   variant: 'error',
      // });
    }
  };

  useEffect(() => {
    const timeout: any = setTimeout(() => {
      // handleStartCapture();
      // setLoading(true);
    }, 2000);
    return () => {
      setStream(null);
      clearTimeout(timeout);
    };
  }, [videoRef, loading, isAllowed, router.query.type]);
  // this Function Load the Camera on When we open

  //This Function Capture the image on button Click
  const handleImageCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      // setImageFile(file);
      Resizer.imageFileResizer(
        file,
        1600, // width
        920, // height
        'JPEG', // format
        80, // quality
        0, // rotation
        (uri: any) => {
          getImageHandler(false, uri);
          const imagePath = URL.createObjectURL(uri);
          setImagePass(imagePath);
          setImageUrl(uri);
        },
        'file', // output type
        1600, // maxWidth
        920, // maxHeight
      );
    }
  };
  //if verification Failed
  const tryAgainHandler = () => {
    setRequestStatusGet(REQUEST_STATUS.IDEL);
    const fileInput = document.getElementById('camera-input');
    if (fileInput) {
      fileInput.click();
    }
  };

  const verificationByPass = () => {
    getImageHandler(true, imageUrl);
  };
  // if (isProofAddress) return <VerificationLoader />;
  if (requestStatusGet === 'failure')
    return (
      <VerificationOnFail
        responseMessage={responseMessage}
        tryAgain={tryAgainHandler}
        documentImage={imagePass}
        hitsCount={hitsCount}
        setHitsCounts={setHitsCounts}
        verificationByPass={verificationByPass}
      />
    );
  if (requestStatusGet === 'loading')
    return (
      <Grid container sx={{ pt: 3 }}>
        <Grid
          item
          xs={5}
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
      <Grid container sx={{ py: 3 }}>
        {isAllowed === 1 && router.query.type !== 'front' && (
          <Grid
            item
            xs={10}
            md={8}
            lg={5}
            sx={{
              background: 'white',
              margin: 'auto',
              minHeight: '550px',
              borderRadius: '30px',
              boxShadow: '0px 64px 96px rgba(60, 52, 126, 0.05)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image src={cameraScan} alt="" />
          </Grid>
        )}
        {isAllowed === 2 && (
          <Grid
            item
            xs={10}
            md={8}
            lg={5}
            sx={{
              background: 'black',
              margin: 'auto',
              borderRadius: '30px',
              boxShadow: '0px 64px 96px rgba(60, 52, 126, 0.05)',
              py: { xs: 4, md: 6, lg: 8 },
              px: { xs: 2, md: 6, lg: 8 },
            }}
          >
            <Box
              border="3px dotted"
              borderColor="success.main"
              sx={{
                margin: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: 2,
              }}
            >
              {imagePass && (
                <img
                  src={imagePass}
                  alt=""
                  style={{ width: '100%', height: '100%' }}
                />
              )}
            </Box>
          </Grid>
        )}
        {router.query.keyword === 'License' ||
        router.query.keyword === 'Address Permit' ? (
          <Grid item xs={12} sx={{ textAlign: 'center', pt: 2 }}>
            {router.query.type === 'front' ? (
              <Box>
                <Typography variant="h4" sx={{ color: 'primary.light', pb: 5 }}>
                  Please put front side of your document
                </Typography>
                <CustomButton
                  styleCustomButton={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mx: 'auto',
                    mt: 1,
                  }}
                  maxWidth="330px"
                  width="fit-content"
                  padding="10px"
                  onClick={tryAgainHandler}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      transition: 'all .2s ease-in-out',
                      display: 'flex',
                      fontWeight: 400,
                      mr: 1,
                    }}
                  >
                    Open Camera
                  </Typography>
                  <Image
                    src={cameraIcon}
                    width={25}
                    height={20}
                    alt="CameraIcon"
                  />
                </CustomButton>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Typography variant="h4" sx={{ color: 'primary.light', pb: 5 }}>
                  Please put back side of your document
                </Typography>
                <CustomButton
                  styleCustomButton={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mx: 'auto',
                    mt: 1,
                  }}
                  maxWidth="330px"
                  width="fit-content"
                  onClick={tryAgainHandler}
                  fullWidth={false}
                  padding={0.8}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      transition: 'all .2s ease-in-out',
                      display: 'flex',
                      fontWeight: 400,
                      mr: 1,
                    }}
                  >
                    Open Camera
                  </Typography>
                  <Image
                    src={cameraIcon}
                    width={25}
                    height={20}
                    alt="CameraIcon"
                  />
                </CustomButton>
              </Box>
            )}
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ textAlign: 'center', pt: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Typography variant="h4" sx={{ color: 'primary.light', pb: 5 }}>
                Please put document infront of Camera
              </Typography>
              <CustomButton
                styleCustomButton={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mx: 'auto',
                  mt: 1,
                }}
                maxWidth="330px"
                width="fit-content"
                padding="10px"
                onClick={tryAgainHandler}
              >
                <Typography
                  variant="h6"
                  sx={{
                    transition: 'all .2s ease-in-out',
                    display: 'flex',
                    fontWeight: 400,
                    mr: 1,
                  }}
                >
                  Open Camera
                </Typography>
                <Image
                  src={cameraIcon}
                  width={25}
                  height={20}
                  alt="CameraIcon"
                />
              </CustomButton>
            </Box>
          </Grid>
        )}
      </Grid>

      <Box sx={{ margin: 'auto', pt: 2 }}>
        <input
          id="camera-input"
          type="file"
          accept="image/*"
          capture={'camera' as boolean | 'user' | 'environment' | undefined}
          onChange={handleImageCapture}
          style={{ display: 'none' }}
        />
      </Box>
    </>
  );
};
