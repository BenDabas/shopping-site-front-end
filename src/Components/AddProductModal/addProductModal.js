import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createNewProductAction } from '../../Actions/productsAction';

// import axios from '../../Services/Axios/axios';
import HttpService from '../../Services/HttpService/httpService';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AddProductModal = ({ open, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const defaultProduct = {
    title: '',
    price: '',
    description: '',
    imageURL: '',
  };

  const [product, setProduct] = useState(defaultProduct);

  const handleProductInput = ({ target }) => {
    const { name, value } = target;
    setProduct({ ...product, [name]: value });
    console.log('product', product);
  };

  const onAddProductButton = () => {
    dispatch(createNewProductAction(product));
    setProduct(defaultProduct);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Add new product</h2>
            <label>Title</label>
            <input
              name="title"
              value={product.title}
              onChange={handleProductInput}
            />
            <label>Price</label>
            <input
              name="price"
              value={product.price}
              onChange={handleProductInput}
            />
            <label>Description</label>
            <input
              name="description"
              value={product.description}
              onChange={handleProductInput}
            />
            <label>Image</label>
            <input
              name="imageURL"
              value={product.imageURL}
              onChange={handleProductInput}
            />
            <button onClick={onAddProductButton}>Add product</button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddProductModal;
