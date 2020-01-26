export enum PageID {
  LOGIN = 'login',
  PROFILE = 'profile',
  MAP = 'map',
  REGISTRATION = 'registration',
}

export enum PageVisibility {
  USER = 1,
  GUEST = 1 << 2,
  ALL = USER | GUEST,
}

export type PageInfo = {
  id: PageID;
  title: string;
  visibility: PageVisibility;
};

export type PageMap = { [key in PageID]: PageInfo };
