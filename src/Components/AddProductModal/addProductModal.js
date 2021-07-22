import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createNewProductAction } from '../../Actions/productsAction';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import './addProductModal.css';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '250px',
    height: ' 350px',
    backgroundColor: '#f5f5f5',
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
              className="add-product-modal-input"
              name="title"
              value={product.title}
              onChange={handleProductInput}
            />
            <label>Price</label>
            <input
              className="add-product-modal-input"
              name="price"
              value={product.price}
              onChange={handleProductInput}
            />
            <label>Description</label>
            <input
              className="add-product-modal-input"
              name="description"
              value={product.description}
              onChange={handleProductInput}
            />
            <label>Image</label>
            <input
              className="add-product-modal-input"
              name="imageURL"
              value={product.imageURL}
              onChange={handleProductInput}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '5px' }}
              onClick={onAddProductButton}
            >
              Add product
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddProductModal;
