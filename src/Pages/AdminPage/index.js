import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllProductsAction } from '../../Actions/productsAction';

import AdminTable from '../../Components/Tables/adminTable';
import AddProductModal from '../../Components/AddProductModal/addProductModal';
import Button from '@material-ui/core/Button';

import './index.css';

const AdminPage = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      dispatch(getAllProductsAction());
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickAddButton = () => {
    handleOpen();
  };

  return (
    <div className="admin-page-wrapper">
      <AddProductModal open={open} onClose={handleClose} />
      <div className="add-button-wrapper">
        <Button
          variant="contained"
          color="primary"
          className="add-button"
          onClick={onClickAddButton}
        >
          Add
        </Button>
      </div>
      <div className="admin-page-table-wrapper">
        <AdminTable />
      </div>
    </div>
  );
};

export default AdminPage;
