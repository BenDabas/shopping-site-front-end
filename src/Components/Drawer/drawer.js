import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  increaseProductAmountAction,
  decreaseProductAmountAction,
  sendTransactionAction,
} from '../../Actions/productsAction';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PaymentSharpIcon from '@material-ui/icons/PaymentSharp';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
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

  const state = useSelector((state) => state);

  const { shoppingCartProducts, shoppingCartSum } = state.products;
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
    dispatch(sendTransactionAction());
  };

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
          <Typography variant="h6" noWrap className={classes.title}>
            Home page
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <PaymentSharpIcon />
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
            {theme.direction === 'ltl' ? (
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
                <ListItemText
                  primary={`${product.title}: ${product.price},         amount: ${product.amount}`}
                />
                <AddIcon onClick={() => onClickPlusButton(product)}>+</AddIcon>
                <RemoveIcon onClick={() => onClickMinusButton(product)}>
                  -
                </RemoveIcon>
              </ListItem>
            ))}
        </List>
        <Divider />
        <label>{`Sum: ${shoppingCartSum.toFixed(2)}`}</label>
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
