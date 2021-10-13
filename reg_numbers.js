'use strict';

module.exports = function reg(pool) {

	const regqueries = async (regNum) => {

		let pattern1 = /^((CA|CK|CL)\s([0-9]){6})$/;
		let pattern2 = /^((CA|CK|CL)\s\d{3}\s\d{3})$/;
		let pattern3 = /^((CA|CK|CL)\s\d{3}\-\d{3})$/;
        
        if(regNum && pattern1.test(regNum) || pattern2.test(regNum) || pattern3.test(regNum)){
            let checkReg = await pool.query('SELECT entered_regs FROM registrations WHERE entered_regs = $1', [regNum]);
			//adding substringt=to look for the first 2 letter from a town
			let substring = regNum.substring(0, 2)
			console.log(substring);
			var idees = await getId(substring);
            if(checkReg.rowCount === 0) { //checking if entered reg does not exist and the add it
                const INSERT_QUERY = await pool.query('INSERT INTO registrations (entered_regs, towns_id) VALUES ($1,$2)', [regNum, idees]);
            }
        }
	}

	//create a function that generates ids 

	async function getId(reg_id){
		try {
			// console.log(reg_id)
			var selectID = await pool.query('SELECT id FROM towns WHERE string_starts_with = $1', [reg_id]);
			return selectID.rows[0].id;
			
		} catch (error) {
			console.log(error)
			
		}
	}

	// let regNumberList = [];

	const setReg = async (plateNumber) => {
		await regqueries(plateNumber)
 
        plateNumber = plateNumber.toUpperCase();
	}

	const getReg = async () => {
		try {
			let regNumberList = await pool.query('SELECT entered_regs FROM registrations')
			return regNumberList.rows;
			
		} catch (error) {
			console.log(error)
			
		}

		return regNumberList;
	  }

	//   add filter function

	const filter = async (eachTown) => {
		var townStartsWith = await getId(eachTown);

		// let townStartsWith = await pool.query('SELECT ')
	}


    async function addBtnErrors(plateNumber) {
		let emptyFieldError = '*Please enter plate number*'
		let alreadyExistRegError = '*Registration number already exist*'
		let incorrectPatternError = '*Please enter reg from these towns in this format [CL 123452] OR [CK 123-321] OR [CL 012 658]*'
		if(plateNumber) {
			if(pattern1.test(plateNumber) || pattern2.test(plateNumber) || pattern3.test(plateNumber)) {
				if(regNumberList.includes(plateNumber)) {
					return alreadyExistRegError;
				}
			} else {
				return incorrectPatternError;
			}
		} else {
			return emptyFieldError;
		}
	}

	const resert = async () => {
		try {
            let clearData = await pool.query('DELETE FROM registrations');
            return clearData.row;
        } catch (error) {
            console.log(error)
        }
	}



    return{
        regqueries,
        setReg,
        getReg,
		resert,
        addBtnErrors,
		getId
    }
}