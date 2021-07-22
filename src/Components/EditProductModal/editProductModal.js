import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { editProductAction } from '../../Actions/productsAction';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import './editProductModal.css';

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

const EditProductModal = ({ open, onClose, productToEdit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(productToEdit);
  }, [productToEdit]);

  const handleProductInput = ({ target }) => {
    const { name, value } = target;
    setProduct({ ...product, [name]: value });
    console.log('product', product);
  };

  const onEditProductButton = () => {
    dispatch(editProductAction(product));
    onClose();
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
            <h2 id="transition-modal-title">Edit product</h2>
            <label>Title</label>
            <input
              className="edit-product-modal-input"
              name="title"
              value={product?.title}
              onChange={handleProductInput}
            />

            <label>Price</label>
            <input
              className="edit-product-modal-input"
              name="price"
              value={product?.price}
              onChange={handleProductInput}
            />
            <label>Description</label>
            <input
              className="edit-product-modal-input"
              name="description"
              value={product?.description}
              onChange={handleProductInput}
            />
            <label>Image</label>
            <input
              className="edit-product-modal-input"
              name="imageUrl"
              value={product?.imageUrl}
              onChange={handleProductInput}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '5px' }}
              onClick={onEditProductButton}
            >
              Edit product
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default EditProductModal;
