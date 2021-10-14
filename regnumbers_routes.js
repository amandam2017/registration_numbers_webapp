'use strict';

module.exports = function Routes(RegFact){

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
            // console.log(reg);
       
            await RegFact.setReg(reg);
            // console.log('done adding')
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
        townRegistrations
    }
}