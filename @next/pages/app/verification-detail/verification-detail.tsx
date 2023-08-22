import React from 'react';
import { VerificationsDetailOrg } from '@organisms';
import { MainLayout } from '@layouts';

export const VerificationsDetail = () => {
  return <VerificationsDetailOrg />;
};

VerificationsDetail.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);
