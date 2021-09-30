'use strict';

module.exports = function reg(pool) {

    async function regqueries(regNum){
        //add charAt

        if(regNum){
            var checkReg = await pool.query('SELECT entered_regs FROM regUsers WHERE entered_regs = $1', [regNum]);
            if(checkReg.rowCount === 0) {
                const INSERT_QUERY = await pool.query('INSERT INTO regUsers (enetered_regs) values ($1)', [regNum]);
            }
        }
    }

	// let localReg = '';
	var pattern1 = /^((CA|CK|CL)\s([0-9]){6})$/;
	var pattern3 = /^((CA|CK|CL)\s\d{3}\-\d{3})$/;
	var pattern2 = /^((CA|CK|CL)\s\d{3}\s\d{3})$/;

    async function setReg(plateNumber) {

		await regqueries(plateNumber)

        plateNumber = plateNumber.toUpperCase();

		if(!regNumberList.includes(plateNumber) && pattern1.test(plateNumber) || pattern2.test(plateNumber) || pattern3.test(plateNumber)) {
			regNumberList.push(plateNumber)
			return localReg = plateNumber
		}
	}

	async function getReg() {
		try {
			var regNumberList = await pool.query('SELECT entered_regs FROM regUsers')
			return regNumberList.rows;
			
		} catch (error) {
			
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
            var clearData = await pool.query('DELETE FROM greetUsers');
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