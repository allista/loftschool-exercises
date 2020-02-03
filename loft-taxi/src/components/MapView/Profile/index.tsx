import React, { FC } from 'react';
import { PageID, pageMap } from 'shared';
import './style.scss';

export interface ProfileProps {}

export const Profile: FC<ProfileProps> = () => {
  return (
    <div className="loft-taxi-profile">
      <div className="loft-taxi-page-title">{pageMap[PageID.PROFILE].title}</div>
    </div>
  );
};
