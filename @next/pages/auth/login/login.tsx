import React from 'react';
import { LoginOrganism } from '@components/organisms';
import { GuestLayout } from '@layouts';
import { CircleAnimation } from '@components/atoms';

export const Login = (): JSX.Element => {
  return (
    <CircleAnimation>
      <LoginOrganism />
    </CircleAnimation>
  );
};

Login.getLayout = (page: React.ReactNode) => <GuestLayout>{page}</GuestLayout>;
