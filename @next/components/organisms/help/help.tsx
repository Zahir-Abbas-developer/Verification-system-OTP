import React from 'react';
import { Box, Grid, List, ListItem, Typography } from '@mui/material';
import { HELP_ARRAY } from '@constants';

export const HelpOrganism = () => {
  const help = (item: any) => {};
  return (
    <>
      <Typography
        sx={{
          fontFamily: 'Poppins',
          color: 'primary.dark',
          fontSize: '30px',
          fontWeight: 500,
          textAlign: 'center',
          pt: 5,
        }}
      >
        How can we help you?
      </Typography>

      <Grid
        container
        rowGap={{ xs: 3, lg: 5, xl: 3 }}
        pt={4}
        sx={{ padding: { xs: 3, xl: '0px 0px 0px 140px' } }}
      >
        {HELP_ARRAY.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={6} lg={6} xl={4}>
            <Typography
              variant="h2"
              pt="20px"
              color="#6E7191"
              fontSize="20px !important"
            >
              {item.title}
            </Typography>
            <List
              sx={{
                py: '0px',
                mt: 2,
                listStyleType: 'disc',
              }}
            >
              {item.description?.map((item: any, index: any) => (
                <ListItem
                  key={index}
                  sx={{ listStyle: 'none', p: 0 }}
                  onClick={() => help(item)}
                >
                  <Box
                    sx={{
                      width: '10px',
                      height: '10px',
                      backgroundColor: '#BFACE0',
                      mr: '10px',
                    }}
                  ></Box>

                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '400',
                      color: '#6E7191',
                      cursor: 'pointer',
                      mt: '3px',
                    }}
                  >
                    {item.subTitle}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
