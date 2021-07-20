import React, { useState } from 'react';

import EditProductModal from '../EditProductModal/editProductModal';

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
import Button from '@material-ui/core/Button';

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

  const state = useSelector((state) => state);
  console.log('state:', state);

  const [productToEdit, setProductToEdit] = useState({});
  const [open, setOpen] = useState(false);

  const onDeleteProduct = (productId) => {
    dispatch(deleteProductAction(productId));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <StyledTableCell style={{ width: '25%' }} align="right">
              description
            </StyledTableCell>
            <StyledTableCell
              style={{ display: 'flex', justifyContent: 'center' }}
              align="right"
            >
              image
            </StyledTableCell>
            <StyledTableCell align="right">price</StyledTableCell>
            <StyledTableCell
              style={{ display: 'flex', justifyContent: 'center' }}
              align="right"
            >
              option
            </StyledTableCell>
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
                <StyledTableCell align="right">
                  <img
                    src={row.imageUrl}
                    alt={row.title}
                    style={{ maxHeight: '150px', maxWidth: '150px' }}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    style={{ margin: '5px' }}
                    variant="contained"
                    color="primary"
                    onClick={() => openEditModal(row)}
                  >
                    edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onDeleteProduct(row.id)}
                  >
                    delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminTable;
