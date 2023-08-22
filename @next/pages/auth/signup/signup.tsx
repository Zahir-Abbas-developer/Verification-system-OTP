import React from 'react';
import { GuestLayout } from '@layouts';
import { SignupOrganism } from '@next/components/organisms/signup';

export const Signup = (): JSX.Element => {
  return <SignupOrganism />;
};

Signup.getLayout = (page: React.ReactNode) => <GuestLayout>{page}</GuestLayout>;
