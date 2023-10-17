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
      <svg xmlns="http://www.w3.org/2000/svg" width="186" height="36" viewBox="0 0 186 36">
        <text id="ImpactTrace" transform="translate(0 29)" fill="#022612" font-size="30" font-family="Gotham-Medium, Gotham" font-weight="500"><tspan x="0" y="0">Impact</tspan><tspan y="0" fill="#2da44e" font-family="Gotham-Book, Gotham" font-weight="400">Trace</tspan></text>
      </svg>

    </>
  );
};

export default LogoMain;
