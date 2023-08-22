import React from 'react';
import { MainLayout } from '@layouts';
import { IntegrationDetailsOrganism } from '@organisms';

export const IntegrationDetails = () => {
  return <IntegrationDetailsOrganism />;
};

IntegrationDetails.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);
