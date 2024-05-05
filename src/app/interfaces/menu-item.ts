export interface MenuItem {
    name: string;
    icon: string;
    submenu?: string[];
    funcName?: string;
    id?: string;
    currentLink?: string;
  }