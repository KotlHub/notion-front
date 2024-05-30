export interface MenuItem {
    name: string;
    icon: string;
    sortButtons?: string[];
    submenu?: MenuItem[];
    funcName?: string;
    id?: string;
    currentLink?: string;
    newPageIcon?: string;
    isFavorite?: boolean;
  }