import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getTopFiveSells,
  getTopFiveUniqueSells,
  getFiveDaysTransaction,
} from '../../Actions/productsAction';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './statsTable.css';

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

const StatsTable = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const { topFiveSells, topFiveUniqueSells, fiveDaysTransactions } =
    useSelector((state) => state.products);

  console.log('StatsTable: topFiveSells', topFiveSells);
  console.log('StatsTable: topFiveUniqueSells', topFiveUniqueSells);
  useEffect(() => {
    dispatch(getTopFiveSells());
    dispatch(getTopFiveUniqueSells());
    dispatch(getFiveDaysTransaction());
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderTableBody = () => {
    return (
      topFiveSells &&
      topFiveSells?.map((row, index) => (
        <StyledTableRow key={index}>
          <StyledTableCell align="right">
            {`${row.title}: ${row.soldAmount}`}
          </StyledTableCell>
          {/* <StyledTableCell align="right">
            {`${row.title}: ${row.uniqueSold} id: ${row.id}   index: ${index}`}
          </StyledTableCell>
          <StyledTableCell align="right">{row.description}</StyledTableCell> */}
        </StyledTableRow>
      ))
    );
  };
  return (
    <div className="stats-table-wrapper">
      <div className="stats-table-col">
        <label>Top 5 sold</label>
        <div className="stats-table-col-body">
          {topFiveSells &&
            topFiveSells.map((row, index) => {
              return <label>{`${row.title}: ${row.soldAmount}`}</label>;
            })}
        </div>
      </div>
      <div className="stats-table-col">
        <label>Top 5 unique sold</label>
        <div className="stats-table-col-body">
          {topFiveUniqueSells &&
            topFiveUniqueSells.map((row, index) => {
              return <label>{`${row.title}: ${row.uniqueSold}`}</label>;
            })}
        </div>
      </div>
      <div className="stats-table-col">
        <label>Past 5 days $</label>
        <div className="stats-table-col-body">
          {fiveDaysTransactions &&
            fiveDaysTransactions.map((row, index) => {
              return <label>{`${row.createdAt}: ${row.price}`}</label>;
            })}
        </div>
      </div>
    </div>
  );

  //   return (
  //     <TableContainer component={Paper}>
  //       <Table className={classes.table} aria-label="customized table">
  //         <TableHead>
  //           <TableRow>
  //             <StyledTableCell align="right">Top 5 sells</StyledTableCell>
  //             <StyledTableCell align="right">Top 5 unique sells</StyledTableCell>
  //             <StyledTableCell align="right">Past 5 days $</StyledTableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>{renderTableBody()}</TableBody>
  //       </Table>
  //     </TableContainer>
  //   );
};

export default StatsTable;
