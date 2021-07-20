import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getTopFiveSells,
  getTopFiveUniqueSells,
  getFiveDaysTransaction,
} from '../../Actions/productsAction';

import './statsTable.css';

const StatsTable = () => {
  const dispatch = useDispatch();

  const { topFiveSells, topFiveUniqueSells, fiveDaysTransactions } =
    useSelector((state) => state.products);

  console.log('StatsTable: topFiveSells', topFiveSells);
  console.log('StatsTable: topFiveUniqueSells', topFiveUniqueSells);
  useEffect(() => {
    dispatch(getTopFiveSells());
    dispatch(getTopFiveUniqueSells());
    dispatch(getFiveDaysTransaction());
  }, []);

  return (
    <div className="stats-table-wrapper">
      <div className="stats-table-col">
        <label>Top 5 sold</label>
        <div className="stats-table-col-body">
          {topFiveSells &&
            topFiveSells.map((row, index) => {
              return (
                <label key={index}>{`${row.title}: ${row.soldAmount}`}</label>
              );
            })}
        </div>
      </div>
      <div className="stats-table-col">
        <label>Top 5 unique sold</label>
        <div className="stats-table-col-body">
          {topFiveUniqueSells &&
            topFiveUniqueSells.map((row, index) => {
              return (
                <label key={index}>{`${row.title}: ${row.uniqueSold}`}</label>
              );
            })}
        </div>
      </div>
      <div className="stats-table-col">
        <label>Past 5 days $</label>
        <div className="stats-table-col-body">
          {fiveDaysTransactions &&
            fiveDaysTransactions.map((row, index) => {
              return (
                <label key={index}>{`${row.createdAt}: ${row.price}`}</label>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default StatsTable;
