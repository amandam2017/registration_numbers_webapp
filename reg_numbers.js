'use strict';

module.exports = function reg(pool) {
  const regqueries = async (toUppReg) => {
    let regNum = toUppReg.toUpperCase();

    let checkReg = await pool.query(
      'SELECT entered_regs FROM registrations WHERE entered_regs = $1',
      [regNum]
    );
    let substring = regNum.substring(0, 2);
    console.log(substring);
    var idees = await getId(substring);
    if (checkReg.rowCount === 0) {
      const INSERT_QUERY = await pool.query(
        'INSERT INTO registrations (entered_regs, towns_id) VALUES ($1,$2)',
        [regNum, idees]
      );
    }
  };

  const getId = async (reg_id) => {
    try {
      var selectID = await pool.query(
        'SELECT id FROM towns WHERE string_starts_with = $1',
        [reg_id]
      );
      return selectID.rows[0].id;
    } catch (error) {
      console.log(error);
    }
  };

  const setReg = async (plateNumber) => {
    plateNumber = plateNumber.toUpperCase();
    await regqueries(plateNumber);
  };

  const getReg = async () => {
    try {
      let regNumberList = await pool.query(
        'SELECT entered_regs FROM registrations'
      );
      return regNumberList.rows;
    } catch (error) {
      console.log(error);
    }
    return regNumberList;
  };

  const list = async (newReg) => {
    try {
      let regList = await pool.query(
        'SELECT entered_regs FROM registrations WHERE entered_regs = $1',
        [newReg]
      );
      return regList.rows;
    } catch (error) {
      console.log(error);
    }
    return regList;
  };

  const filter = async (towns) => {
    let townStartsWith = await getId(towns);
    console.log('starts string:' + townStartsWith);
    let getReg = await pool.query(
      'SELECT entered_regs FROM registrations WHERE towns_id = $1',
      [townStartsWith]
    );
    return getReg.rows;
  };

  const showAll = async () => {
    try {
      let allTowns = await pool.query('SELECT entered_regs FROM registrations');
      return allTowns.rows;
    } catch (error) {}
  };

  const resert = async () => {
    try {
      let clearData = await pool.query('DELETE FROM registrations');
      return clearData.row;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    regqueries,
    setReg,
    getReg,
    getId,
    filter,
    showAll,
    resert,
    list,
  };
};
