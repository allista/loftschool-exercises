import React, { FC } from 'react';
import { PageID, pageMap } from 'shared';
import Header from 'components/Header';
import './style.scss';

export interface ProfileProps {}

export const Profile: FC<ProfileProps> = () => {
  return (
    <>
      <Header />
      <div className="loft-taxi-profile">
        <div className="loft-taxi-page-title">{pageMap[PageID.PROFILE].title}</div>
      </div>
    </>
  );
};

export default Profile;
