import React from 'react';
import { AuthSelectUser } from '@components/organisms';
import { GuestLayout } from '@layouts';

export const SelectUserType = (): JSX.Element => {
  return <AuthSelectUser />;
};

SelectUserType.getLayout = (page: React.ReactNode) => (
  <GuestLayout>{page}</GuestLayout>
);
