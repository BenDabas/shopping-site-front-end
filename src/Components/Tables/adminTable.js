import React, { useState } from 'react';

import EditProductModal from '../EditProductModal/editProductModal';

import axios from '../../Services/Axios/axios';

import { useSelector, useDispatch } from 'react-redux';

import { deleteProductAction } from '../../Actions/productsAction';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const AdminTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  // const { products } = useSelector((state) => state.products);

  const state = useSelector((state) => state);
  console.log('state:', state);

  const [productToEdit, setProductToEdit] = useState({});
  const [open, setOpen] = useState(false);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rowss = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const onDeleteProduct = (productId) => {
    dispatch(deleteProductAction(productId));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickAddButton = () => {
    handleOpen();
  };

  const openEditModal = (product) => {
    setProductToEdit(product);
    handleOpen();
  };

  return (
    <TableContainer component={Paper}>
      <EditProductModal
        open={open}
        onClose={handleClose}
        productToEdit={productToEdit}
      />
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">title</StyledTableCell>
            <StyledTableCell align="right">description</StyledTableCell>
            <StyledTableCell align="right">price</StyledTableCell>
            <StyledTableCell align="right">option</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products &&
            products?.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="right">{row.title}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">
                  {/* <button onClick={()=>onEditProduct(row.id)}>edit</button> */}
                  <button onClick={() => openEditModal(row)}>edit</button>
                  <button onClick={() => onDeleteProduct(row.id)}>
                    delete
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}

          {console.log('rows::', products)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminTable;
