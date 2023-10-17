// third-party
import { FormattedMessage } from 'react-intl';

//icons
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

// assets
import {
  ShoppingCartOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  ShoppingCartOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const sidenav: NavItemType[] = [
  {
    id: 'dashboard',
    title: <FormattedMessage id="Dashboard" />,
    type: 'item',
    icon: icons.DashboardOutlined,
    url: '/dashboard/analytics',
  },
  {
    id: 'products',
    title: <FormattedMessage id="products" />,
    type: 'collapse',
    icon: icons.ShoppingCartOutlined,
    children: [
      {
        id: 'products',
        title: <FormattedMessage id="Products" />,
        type: 'item',
        url: '/apps/products/product-list',
        breadcrumbs: false
      },
      {
        id: 'passport',
        title: <FormattedMessage id="Passport" />,
        type: 'item',
        breadcrumbs: false
      }
    ]

  },
  {
    id: 'invertory',
    title: <FormattedMessage id="Inventory" />,
    type: 'collapse',
    icon: Inventory2OutlinedIcon,
    children: [
      {
        id: 'purchase-order',
        title: <FormattedMessage id="Purchase Order" />,
        type: 'item',
        url: '/apps/inventory/purchase-order',
      },
      {
        id: 'invoices',
        title: <FormattedMessage id="Invoices" />,
        type: 'item',
        url: '/apps/inventory/invoices',
      }
    ]

  },
  {
    id: 'production-plant',
    title: <FormattedMessage id="Production Plant" />,
    type: 'item',
    icon: FactoryOutlinedIcon,
    url: '/apps/production-plant',
  }, 
  {
    id: 'partner',
    title: <FormattedMessage id="Partner" />,
    type: 'item',
    icon: icons.UsergroupAddOutlined,
    url: '/apps/partners',
    breadcrumbs: true
  }, 
  {
    id: 'digital-passport',
    title: <FormattedMessage id="Digital Passport" />,
    type: 'item',
    icon: DocumentScannerOutlinedIcon,
    url: '/dashboard/analytics',
  }, 
  {
    id: 'sites',
    title: <FormattedMessage id="Sites" />,
    type: 'item',
    icon: PlaceOutlinedIcon,
    url: '/dashboard/analytics',
  },
];

export default sidenav;
