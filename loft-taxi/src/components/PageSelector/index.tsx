import React, { FC } from 'react';
import { PageID } from 'shared';
import Login from 'components/Login';
import Profile from 'components/Profile';
import MapView from 'components/MapView';
import Registration from 'components/Registration';
import { getPageID } from 'store/selectors';
import { useSelector } from 'react-redux';

const pageToComponent = {
  [PageID.LOGIN]: Login,
  [PageID.PROFILE]: Profile,
  [PageID.MAP]: MapView,
  [PageID.REGISTRATION]: Registration,
};

export const PageSelector: FC = () => {
  const currentPageID = useSelector(getPageID);
  const Page = pageToComponent[currentPageID] || null;
  return <Page />;
};

export default PageSelector;
