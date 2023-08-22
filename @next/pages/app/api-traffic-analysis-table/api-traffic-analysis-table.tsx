import React from 'react';
import { MainLayout } from '@layouts';
import { ApiTrafficAnalysisTable } from '@molecules';
import { useRouter } from 'next/router';

export const ApiTrafficAnalysisTablePage = (): JSX.Element => {
  const router = useRouter();
  const query = router.query.hitType;

  return <ApiTrafficAnalysisTable type={query} />;
};

ApiTrafficAnalysisTablePage.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);
