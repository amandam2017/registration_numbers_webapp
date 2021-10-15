'use strict';

module.exports = function Routes(RegFact){

  let pattern1 = /^((CA|CK|CL)\s([0-9]){6})$/;
  let pattern2 = /^((CA|CK|CL)\s\d{3}\s\d{3})$/;
  let pattern3 = /^((CA|CK|CL)\s\d{3}\-\d{3})$/;

    const home = async (req, res) => {
      try {            
        res.render("index", {
          eachRegNo: await RegFact.getReg(),
        });
    
      } catch (error) {
        console.log(error);
      }
    }

    const addReg = async (req, res) => {
      try {
        var reg = req.body.enteredReg

        if(reg){
          if(reg && pattern1.test(reg) || pattern2.test(reg) || pattern3.test(reg)){
            console.log(reg);
            req.flash('successfulMessage', '*Successfully added registration*');

            await RegFact.setReg(reg);

            console.log('done adding');

          }else{
            req.flash('error', '*Please enter a valid registration format: CA 125-652 CL 201 201 CK 125254*')
          }
            
        }else{
          req.flash('error', "*Please enter a registration number*")

        }
        // console.log('before redirect');
        res.redirect('/');
        
    } catch (error) {
        console.log(error)
    }
    }

    const townRegistrations = async (req, res) => {
      try {
        var checkedTown = req.body.town
        // console.log('checked town: ' + checkedTown);

        let townReg = await RegFact.filter(checkedTown);
          console.log(townReg);
        res.render('index', {
          townReg
        });
        
      } catch (error) {
        console.log(error)
        
      }
    }

    const showAllRegs = async (req, res) => {
      try {

        
      } catch (error) {
        
      }
    }

    const clearDataBase = async (req, res) => {
      try {
    
        await RegFact.resert()
    
        res.redirect('/')
      } catch (error) {
        console.log(error);
      }
    }

    return{
        home,
        addReg,
        clearDataBase,
        townRegistrations,
        showAllRegs
    }
}