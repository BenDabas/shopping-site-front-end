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

const useStyles = makeStyles((theme) => ({
  imageList: {
    width: 500,
    // height: 450,
  },
  icon: {
    backgroundColor: 'black',
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { products, shoppingCartProducts } = useSelector(
    (state) => state.products
  );
  console.log('products', products);

  useEffect(() => {
    try {
      dispatch(getAllProductsAction());
    } catch (error) {
      console.log('HomePage: ERROR:', error.message);
    }
  }, [shoppingCartProducts]);

  const onAddProductToShoppingCart = (product) => {
    dispatch(addProductToShoppingCartAction(product));
  };

  return (
    <div className="home-page-wrapper">
      <CDrawer />
      <div className="grid-wrapper">
        {products &&
          products?.map((product, index) => (
            <div className="product-wrapper">
              <img
                className="home-page-product-image"
                src={product.imageUrl}
                alt={product.title}
              />
              <div className="labels-input-wrapper-home-page">
                <label> {`title: ${product.title}`}</label>
                <label> {`description: ${product.description}`}</label>
                <label>{`price: ${product.price}`}</label>
              </div>
              <div className="add-to-cart-button-wrapper">
                <IconButton
                  onClick={() => onAddProductToShoppingCart(product)}
                  aria-label={`info about ${product.title}`}
                  className={classes.icon}
                >
                  <i class="fas fa-cart-plus"></i>
                </IconButton>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
