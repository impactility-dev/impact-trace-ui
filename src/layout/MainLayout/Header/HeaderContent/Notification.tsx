import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Popper,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import Transitions from 'components/@extended/Transitions';

// assets
import { BellOutlined, CheckCircleOutlined, GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';

// types
import { ThemeMode } from 'types/config';
import { useNavigate } from 'react-router';

// sx styles
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',

  transform: 'none'
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const anchorRef = useRef<any>(null);
  const [read, setRead] = useState(1);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const history = useNavigate();
  const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'grey.200' : 'grey.300';
  const iconBackColor = theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        color="secondary"
        variant="light"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={read} color="primary">
          <BellOutlined />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position={matchesXs ? 'top' : 'top-right'} sx={{ overflow: 'hidden' }} in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: '100%',
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 285
                }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="Notification"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <>
                      {read > 0 && (
                        <Tooltip title="Mark as all read">
                          <IconButton color="success" size="small" onClick={() => setRead(0)}>
                            <CheckCircleOutlined style={{ fontSize: '1.15rem' }} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </>
                  }
                >
                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      '& .MuiListItemButton-root': {
                        py: 0.5,
                        '&.Mui-selected': { bgcolor: 'grey.50', color: 'text.primary' },
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                      }
                    }}
                  >
                    <ListItemButton selected={read > 0} onClick={()=>(
                      history('/apps/profiles/account/basic')
        )}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: 'error.main',
                            bgcolor: 'error.lighter'
                          }}
                        >
                          <SettingOutlined />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                            Your Profile is Complete &nbsp;
                            <Typography component="span" variant="subtitle1">
                              30%
                            </Typography>{' '}
                          </Typography>
                        }
                        secondary="7 hours ago"
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="caption" noWrap>
                          2:45 PM
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton sx={{ textAlign: 'center', py: `${12}px !important` }}>
                      <ListItemText
                        primary={
                          <Typography variant="h6" color="primary">
                            View All
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Notification;
