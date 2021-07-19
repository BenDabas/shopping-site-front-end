import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getAllProductsAction,
  addProductToShoppingCartAction,
} from '../../Actions/productsAction';
import CDrawer from '../../Components/Drawer/drawer';

import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';

import './index.css';

// import InfoIcon from '@material-ui/icons/Info';

// import { makeStyles } from '@material-ui/core/styles';
// import ImageList from '@material-ui/core/ImageList';
// import ImageListItem from '@material-ui/core/ImageListItem';
// import ImageListItemBar from '@material-ui/core/ImageListItemBar';
// import IconButton from '@material-ui/core/IconButton';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
// import itemData from './itemData';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     overflow: 'hidden',
//     backgroundColor: theme.palette.background.paper,
//   },
//   imageList: {
//     width: 500,
//     height: 450,
//     // Promote the list into its own layer in Chrome. This cost memory, but helps keep FPS high.
//     transform: 'translateZ(0)',
//   },
//   titleBar: {
//     background:
//       'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
//       'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
//   },
//   icon: {
//     color: 'white',
//   },
// }));

const useStyles = makeStyles((theme) => ({
  imageList: {
    width: 500,
    // height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  // const { products } = state;
  console.log('products', products);
  // console.log('state', state);

  useEffect(() => {
    try {
      dispatch(getAllProductsAction());
    } catch (error) {
      console.log('HomePage: ERROR:', error.message);
    }
  }, []);

  const onAddProductToShoppingCart = (product) => {
    dispatch(addProductToShoppingCartAction(product));
  };

  return (
    <div className="home-page-wrapper">
      <CDrawer />

      <div className="shopping-cart-button-wrapper">
        <button className="shopping-cart">shopping cart</button>
      </div>
      {/* <ImageList rowHeight={180} className={classes.imageList}> */}
      {/* <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Product's list</ListSubheader>
        </ImageListItem> */}
      <div className="grid-wrapper">
        {products &&
          products?.map((product, index) => (
            <div className="product-wrapper">
              <img
                className="home-page-product-image"
                src={product.imageUrl}
                alt={product.title}
              />
              <label> {`title: ${product.title}`}</label>
              <label> {`description: ${product.description}`}</label>
              <label>{`price: ${product.price}`}</label>
              <IconButton
                onClick={() => onAddProductToShoppingCart(product)}
                aria-label={`info about ${product.title}`}
                className={classes.icon}
              >
                <i class="fas fa-cart-plus"></i>
              </IconButton>
              {/* <ImageListItem key={index}>
                <img src={product.imageUrl} alt={product.title} />
                <ImageListItemBar
                  title={product.title}
                  subtitle={
                    <div>
                      <span>{product.description}</span> <br />{' '}
                      <span> {product.price} $ </span>
                    </div>
                  }
                  actionIcon={
                    <IconButton
                      onClick={() => onAddProductToShoppingCart(product)}
                      aria-label={`info about ${product.title}`}
                      className={classes.icon}
                    >
                      <i class="fas fa-cart-plus"></i>
                    </IconButton>
                  }
                />
              </ImageListItem> */}
            </div>
          ))}
      </div>
      {/* </ImageList> */}
    </div>
  );
};

export default HomePage;
