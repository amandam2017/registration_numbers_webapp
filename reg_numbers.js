'use strict';

module.exports = function reg(pool) {

    async function regqueries(regNum){
		var pattern1 = /^((CA|CK|CL)\s([0-9]){6})$/;
		var pattern2 = /^((CA|CK|CL)\s\d{3}\s\d{3})$/;
		var pattern3 = /^((CA|CK|CL)\s\d{3}\-\d{3})$/;
        //add charAt
        if(regNum && pattern1.test(regNum) || pattern2.test(regNum) || pattern3.test(regNum)){
            var checkReg = await pool.query('SELECT entered_regs FROM regUsers WHERE entered_regs = $1', [regNum]);
            if(checkReg.rowCount === 0) { //checking if entered reg does not exist and the add it
                const INSERT_QUERY = await pool.query('INSERT INTO regUsers (entered_regs) values ($1)', [regNum]);
            }
        }

    }
	let regNumberList = [];

    async function setReg(plateNumber) {

		await regqueries(plateNumber)
 
        plateNumber = plateNumber.toUpperCase();
	}

	const getReg = async () => {
		try {
			var regNumberList = await pool.query('SELECT entered_regs FROM regUsers')
			return regNumberList.rows;
			
		} catch (error) {
			console.log(error)
			
		}

		return regNumberList;
	  }

    async function addBtnErrors(plateNumber) {
		var emptyFieldError = '*Please enter plate number*'
		var alreadyExistRegError = '*Registration number already exist*'
		var incorrectPatternError = '*Please enter reg from these towns in this format [CL 123452] OR [CK 123-321] OR [CL 012 658]*'
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

	async function resert(){
        try {
            var clearData = await pool.query('DELETE FROM regUsers');
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
    }
}