export interface MenuItem {
    name: string;
    icon: string;
    submenu?: MenuItem[];
    funcName?: string;
    id?: string;
    currentLink?: string;
    newPageIcon?: string;
  }