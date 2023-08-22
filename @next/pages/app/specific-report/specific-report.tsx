import React from 'react';
import { MainLayout } from '@layouts';
import { SpecificReportOrganisms } from '@organisms';

export const SpecificReport = (): JSX.Element => {
  return <SpecificReportOrganisms />;
};

SpecificReport.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);
