import { Outlet } from 'react-router-dom';
import SiteFooter from './components/footer/SiteFooter.tsx';

const Layout = () => (
  <>
    <Outlet />
    <SiteFooter />
  </>
);

export default Layout;
