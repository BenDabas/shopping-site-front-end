import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  increaseProductAmountAction,
  decreaseProductAmountAction,
  sendTransactionAction,
} from '../../Actions/productsAction';

import HttpService from '../../Services/HttpService/httpService';

import clsx from 'clsx';
import {
  makeStyles,
  responsiveFontSizes,
  useTheme,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import CreditCardIcon from '@material-ui/icons/CreditCard';

const drawerWidth = 440;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

const CDrawer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  // const [sum, setSum] = useState(0);

  // const { products } = useSelector((state) => state.products);
  const state = useSelector((state) => state);
  const { shoppingCartProducts, shoppingCartSum } = state.products;
  // const { shoppingCartProducts } = useSelector(
  //   (state) => state.shoppingCartProducts
  // );

  console.log('state', state);
  console.log('shoppingCartProducts', shoppingCartProducts);

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onClickPlusButton = (product) => {
    dispatch(increaseProductAmountAction(product));
  };

  const onClickMinusButton = (product) => {
    dispatch(decreaseProductAmountAction(product));
  };

  const onCheckoutButton = () => {
    //     try {
    // const res = HttpService.makeHttpPostRequest('/')
    //     } catch(error) {

    //     }

    dispatch(sendTransactionAction());
  };

  // const shoppingCart = ['All mail', 'Trash', 'Spam'];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {shoppingCartProducts &&
            shoppingCartProducts.map((product, index) => (
              <ListItem button key={index}>
                {/* <ListItemText primary={product.title} /> */}

                <ListItemText
                  primary={`${product.title}: ${product.price},         amount: ${product.amount}`}
                />
                <button onClick={() => onClickPlusButton(product)}>+</button>
                <button onClick={() => onClickMinusButton(product)}>-</button>
              </ListItem>
            ))}
        </List>
        <Divider />
        <label>{`Sum: ${shoppingCartSum}`}</label>
        <div>
          <CreditCardIcon
            fontSize="large"
            style={{ fontSize: 40 }}
            onClick={onCheckoutButton}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default CDrawer;
