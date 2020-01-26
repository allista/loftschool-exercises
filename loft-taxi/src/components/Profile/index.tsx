import React, { FC } from 'react';
import { PageID, pageMap } from '../../shared';

export interface ProfileProps {}

export const Profile: FC<ProfileProps> = ({}) => {
  return (
    <div className="loft-taxi-map">
      <div className="loft-taxi-page-title">{pageMap[PageID.PROFILE].title}</div>
    </div>
  );
};

export default Profile;
