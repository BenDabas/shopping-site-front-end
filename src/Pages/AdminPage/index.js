import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllProductsAction } from '../../Actions/productsAction';

import axios from '../../Services/Axios/axios';
import AdminTable from '../../Components/Tables/adminTable';
import AddProductModal from '../../Components/AddProductModal/addProductModal';

import HttpService from '../../Services/HttpService/httpService';

import './index.css';

const AdminPage = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const { products } = useSelector((state) => state.products);
  const state = useSelector((state) => state);
  console.log('state:', state);

  useEffect(() => {
    try {
      dispatch(getAllProductsAction());
      // getAllProducts();
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
        <button className="add-button" onClick={onClickAddButton}>
          Add
        </button>
      </div>
      <div className="admin-page-table-wrapper">
        <AdminTable />
      </div>
    </div>
  );
};

export default AdminPage;
