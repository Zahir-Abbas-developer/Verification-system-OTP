import React from 'react';
import { MainLayout } from '@layouts';
import { HelpOrganism } from '@organisms';

export const Help = (): JSX.Element => {
  return <HelpOrganism />;
};

Help.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);
