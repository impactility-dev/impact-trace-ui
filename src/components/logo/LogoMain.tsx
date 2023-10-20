// material-ui
import { useTheme } from '@mui/material/styles';
import { ThemeMode } from 'types/config';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const LogoMain = ({ reverse, ...others }: { reverse?: boolean }) => {
  const theme = useTheme();
  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={theme.palette.mode === ThemeMode.DARK ? logoDark : logo} alt="Mantis" width="100" />
     *
     */
    <>
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="186" height="36" viewBox="0 0 186 36">
        <text id="ImpactTrace" transform="translate(0 29)" fill="#022612" font-size="30" font-family="Gotham-Medium, Gotham" font-weight="500"><tspan x="0" y="0">Impact</tspan><tspan y="0" fill="#2da44e" font-family="Gotham-Book, Gotham" font-weight="400">Trace</tspan></text>
      </svg> */}
      <svg id="Shell_x5F_2012_x5F_PECTEN_x5F_RGB"  width="186" height="90" version="1.1" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <rect x="-12.1" y="-103.7" width="141.7" height="141.7" fill="none"/>
        <g transform="matrix(.22054 0 0 .22054 -.94555 -.53756)">
          <path d="m54.6 87.8h-18l-1.6-13.3-11-7.9c-0.5-2.3-0.7-4.7-0.7-7.1 0-19.6 15.9-35.4 35.4-35.4 19.6 0 35.4 15.9 35.4 35.4 0 2.4-0.2 4.8-0.7 7.1l-10.9 7.9-1.7 13.3h-18l-1 0.8c-0.9 0.7-2 1-3.1 1s-2.2-0.4-3.1-1z" fill="none" stroke="#fff" stroke-miterlimit="40" stroke-width="1.75"/>
          <path d="m54.6 87.8h-18l-1.6-13.3-11-7.9c-0.5-2.3-0.7-4.7-0.7-7.1 0-19.6 15.9-35.4 35.4-35.4 19.6 0 35.4 15.9 35.4 35.4 0 2.4-0.2 4.8-0.7 7.1l-10.9 7.9-1.7 13.3h-18l-1 0.8c-0.9 0.7-2 1-3.1 1s-2.2-0.4-3.1-1z" fill="#fbce07"/>
          <path d="m54.6 87.8h-18l-1.6-13.3-11-7.9c-0.5-2.3-0.7-4.7-0.7-7.1 0-19.6 15.9-35.4 35.4-35.4s35.4 15.9 35.4 35.4c0 2.4-0.2 4.8-0.7 7.1l-10.9 7.9-1.7 13.3h-18l-1 0.8c-0.9 0.7-2 1-3.1 1s-2.2-0.4-3.1-1zm0.6-6.2h-13.1l-1.3-10.6-10.8-7.8c-0.3-1.2-0.5-2.5-0.5-3.8 0-2.1 0.4-4.2 1.3-6.1l19.1 19.3-18.5-22.9c0.7-3 2.3-5.6 4.6-7.7l16.6 28.7-14.7-31.3c1.9-2.5 4.6-4.4 7.6-5.3l10.2 35.6-7.4-37.1c2.3-1.3 4.8-1.9 7.4-1.9 0.5 0 1.1 0 1.6 0.1l1.5 38.5 1.5-38.5c0.5-0.1 1.1-0.1 1.6-0.1 2.6 0 5.1 0.7 7.4 1.9l-7.4 37.1 10.2-35.7c3 0.9 5.7 2.8 7.6 5.3l-14.8 31.4 16.6-28.7c2.3 2 3.9 4.7 4.6 7.7l-18.5 22.9 19.1-19.3c0.9 1.9 1.3 4 1.3 6.1 0 1.3-0.2 2.5-0.5 3.8l-10.8 7.8-1.3 10.6h-13l-2 1.4c-0.5 0.4-1.1 0.5-1.7 0.5s-1.2-0.2-1.7-0.5z" fill="#dd1d21" fill-rule="evenodd"/>
        </g>
      </svg>

    </>
  );
};

export default LogoMain;
