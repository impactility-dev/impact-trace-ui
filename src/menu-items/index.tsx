// project import
import applications from './applications';
import widget from './widget';
import formsTables from './forms-tables';
import chartsMap from './charts-map';
import other from './other';
import pages from './pages';
import sidenav from './side-nav';


// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  // items: [widget, applications, formsTables, chartsMap, pages, other]
  items: [...sidenav, 
    // applications
  ]
};

export default menuItems;
