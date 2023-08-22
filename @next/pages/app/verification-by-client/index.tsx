import React from 'react';
import { VerificationByClientOrg } from '@organisms';

export const VerificationByClient = ({ publicKey, containerId }: any) => {
  return (
    <VerificationByClientOrg publicKey={publicKey} containerId={containerId} />
  );
};
