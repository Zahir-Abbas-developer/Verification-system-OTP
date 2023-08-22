import React from 'react';
import { MainLayout } from '@layouts';
import {
  CompanyAdminDashboardOrganism,
  SuperAdminDashboardOrganism,
  UserDashboardOrganism,
} from '@organisms';
import { useAppSelector } from '@hooks';
import { companyRoles } from '@constants';

export const Dashboard = (): JSX.Element => {
  const { user } = useAppSelector((state: { auth: any }) => state.auth);
  let role = user?.roles?.length && user?.roles[0];

  if (companyRoles.includes(role)) {
    return <CompanyAdminDashboardOrganism />;
  } else if (role === 'SUPER_ADMIN') {
    return <SuperAdminDashboardOrganism />;
  } else if (role === 'SIMPLE_USER') {
    return <UserDashboardOrganism />;
  }
  return <></>;
};

Dashboard.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);
