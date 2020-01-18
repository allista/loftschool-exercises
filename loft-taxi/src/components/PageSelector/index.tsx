import React, { FC } from 'react';
import Login from '../Login';
import Profile from '../Proile';
import MapView from '../MapView';
import Registration from '../Registration';
import { PageID } from '../../shared';

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
  return <>{pageToComponent[pageID] || null}</>;
};

export default PageSelector;
