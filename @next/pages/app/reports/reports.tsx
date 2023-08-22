import React from 'react';
import { MainLayout } from '@layouts';
import { AccessDenied, ReportsOrganisms } from '@organisms';
import { useAppSelector } from '@hooks';
import router from 'next/router';

export const Reports = (): JSX.Element => {
  const { user } = useAppSelector((state: { auth: any }) => state.auth);
  let role = user?.roles?.length && user?.roles[0];

  const handleClose = () => router?.push('./dashboard');

  if (role === 'SIMPLE_USER') {
    return <AccessDenied open={true} handleClose={handleClose} />;
  }

  return <ReportsOrganisms />;
};

Reports.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);
