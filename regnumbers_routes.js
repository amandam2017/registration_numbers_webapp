'use strict';

module.exports = function Routes(RegFact){

    async function home(req, res){
        try {            
              res.render("index", {
                eachRegNo: await RegFact.getReg(),
              });
          
            } catch (error) {
              console.log(error);
            }
    }

    async function addReg(req, res){
        try {
            var reg = req.body.enteredReg

            if(reg){
                console.log(reg);
           
                await RegFact.setReg(reg);
                console.log('done adding')
            }
        console.log('before redirect');
            res.redirect('/');
            
        } catch (error) {
            console.log(error)
        }
    }

    async function clearDataBase(req, res) {
        try {
      
          await RegFact.resert()
      
          res.redirect('/')
        } catch (error) {
          console.log(error);
        }
      }

      const townRegistrations = async (req, res) => {
        try {
          res.render('enteredRegs',{
            eachRegNo: await RegFact.regsFromTown(),

          })
          
        } catch (error) {
          console.log(error)
          
        }
      }

    return{
        home,
        addReg,
        clearDataBase,
        townRegistrations
    }
}