import React, { FC } from 'react';
import { PageID } from 'shared';
import Login from 'components/Login';
import Profile from 'components/Profile';
import MapView from 'components/MapView';
import Registration from 'components/Registration';

export interface PageSelectorProps {
  pageID: PageID;
}

const pageToComponent = {
  [PageID.LOGIN]: Login,
  [PageID.PROFILE]: Profile,
  [PageID.MAP]: MapView,
  [PageID.REGISTRATION]: Registration,
};

export const PageSelector: FC<PageSelectorProps> = ({ pageID }) => {
  const Page = pageToComponent[pageID] || null;
  return <Page />;
};

export default PageSelector;
