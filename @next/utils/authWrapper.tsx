import React, { useEffect, useState } from 'react';
import { MainLoader } from '@components/molecules';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
  authActions,
  loginInWithToken,
  setAxiosInterceptors,
  handleAuthentication,
  isAuthenticated,
} from '@store';

export const AuthWrapper = ({ children }: { children: any }): JSX.Element => {
  const {
    refreshToken,
    user: { userId },
  }: any = useAppSelector((state: { auth: any }) => state.auth);
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      setAxiosInterceptors({
        onLogout: () => dispatch(authActions.logout()),
      });
      handleAuthentication();
      if (isAuthenticated()) {
        await dispatch(loginInWithToken({ userId, refreshToken }));
      }
      setLoading(false);
    };
    initAuth();
  }, [dispatch]);

  if (isLoading) {
    return <MainLoader />;
  }

  return children;
};
