// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// types
import { ThemeDirection, ThemeMode } from 'types/config';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'absolute',
        filter: 'blur(18px)',
        zIndex: -1,
        top: 200,
        left: -100,
        transform: 'rotate(45deg)'
      }}
    >
       <svg xmlns="http://www.w3.org/2000/svg" width="299" height="278" viewBox="0 0 598 556">
      <g id="IT3" transform="translate(-721 -414)">
        <rect id="Rectangle_6387" data-name="Rectangle 6387" width="598" height="556" rx="101" transform="translate(721 414)" fill="#2da44e" />
        <text id="IT" transform="translate(832 832)" fill="#fff" font-size="390" font-family="Gotham-Medium, Gotham" font-weight="500"><tspan x="0" y="0">IT</tspan></text>
      </g>
    </svg>
    </Box>
  );
};

export default AuthBackground;
