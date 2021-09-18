import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IntlMessages from '../../utility/IntlMessages';
import Hidden from '@material-ui/core/Hidden';
import clsx from 'clsx';
import {Fonts} from '../../../shared/constants/AppEnums';
import {CremaTheme} from '../../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  crPopover: {
    '& .MuiPopover-paper': {
      width: 260,
      [theme.breakpoints.up('sm')]: {
        width: 300,
      },
      [theme.breakpoints.up('xl')]: {
        width: 380,
      },
    },
    '& .scroll-submenu': {
      maxHeight: 200,
      [theme.breakpoints.up('xl')]: {
        maxHeight: 380,
      },
    },
  },
  btnPopover: {
    borderRadius: 0,
    width: '100%',
    textTransform: 'capitalize',
  },
  notiBtn: {
    justifyContent: 'flex-start',
    width: '100%',
    height: 56,
    fontSize: 16,
    borderRadius: 0,
    paddingLeft: '1rem',
    paddingRight: '1rem',
    color: theme.palette.grey[800],
    '&:hover, &:focus': {
      color: theme.palette.text.primary,
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.up('sm')]: {
      height: 70,
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
      width: 'auto',
      borderLeft: 'solid 1px',
      borderColor: theme.palette.grey[200],
      color: theme.palette.grey[400],
      '&:hover, &:focus': {
        color: theme.palette.text.primary,
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
      },
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: '2.5rem',
      paddingRight: '2.5rem',
    },
  },
  listStyle: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  badgeStyle: {
    marginRight: 8,
  },
  smsIcon: {
    fontSize: 22,
    color: theme.palette.text.secondary,
    [theme.breakpoints.up('xl')]: {
      fontSize: 30,
    },
  },
  listRoot: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

interface HeaderMessagesProps {}

const HeaderMessages: React.FC<HeaderMessagesProps> = () => {
  const [
    anchorMessages,
    setAnchorMessages,
  ] = React.useState<HTMLButtonElement | null>(null);

  const onClickMessagesButton = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorMessages(event.currentTarget);
  };

  const classes = useStyles();

  return (
    <>
      <IconButton
        className={clsx(classes.notiBtn, 'notiBtn')}
        aria-label='show 4 new mails'
        color='inherit'
        onClick={onClickMessagesButton}>
   
        <Hidden mdUp>
          <Box
            ml={4}
            fontSize={16}
            fontFamily='Poppins'
            fontWeight={Fonts.REGULAR}
            component='span'>
            <IntlMessages id='dashboard.messages' />
          </Box>
        </Hidden>
      </IconButton>

      <Popover
        anchorEl={anchorMessages}
        id='app-message'
        className={classes.crPopover}
        open={Boolean(anchorMessages)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={() => setAnchorMessages(null)}>
        <Box>
          <Box mt={2}>
            <Button
              className={classes.btnPopover}
              variant='contained'
              color='primary'>
              <IntlMessages id='common.viewAll' />
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default HeaderMessages;
