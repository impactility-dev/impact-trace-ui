// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoIconDark from 'assets/images/logo-icon-dark.svg';
 * import logoIcon from 'assets/images/logo-icon.svg';
 * import { ThemeMode } from 'types/config';
 *
 */

// ==============================|| LOGO ICON SVG ||============================== //

const LogoIcon = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={theme.palette.mode === ThemeMode.DARK ? logoIconDark : logoIcon} alt="Mantis" width="100" />
     *
     */
    <svg xmlns="http://www.w3.org/2000/svg" width="598" height="556" viewBox="0 0 598 556">
      <g id="IT3" transform="translate(-721 -414)">
        <rect id="Rectangle_6387" data-name="Rectangle 6387" width="598" height="556" rx="101" transform="translate(721 414)" fill="#2da44e" />
        <text id="IT" transform="translate(832 832)" fill="#fff" font-size="390" font-family="Gotham-Medium, Gotham" font-weight="500"><tspan x="0" y="0">IT</tspan></text>
      </g>
    </svg>


  );
};

export default LogoIcon;
