import React from 'react';
import { MainLayout } from '@layouts';
import { Error404View } from '@organisms';

export const NotFound = (): JSX.Element => <Error404View />;

NotFound.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);
