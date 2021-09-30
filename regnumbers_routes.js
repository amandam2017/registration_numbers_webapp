'use strict';

module.exports = function Routes(RegFact){

    let addedRegs = ''

    async function home(req, res){
        try {            
              res.render("index", {
                eachRegNo: addedRegs,
              });
          
            } catch (error) {
              console.log(error);
            }
    }

    async function addReg(req, res){
        console.log(await RegFact.setReg())
        try {
            var reg = req.body.enteredReg

            if(reg){
                addedRegs = await RegFact.setReg({
                    reg: req.body.enteredReg,
                });
            }

            res.rediret('/');
            
        } catch (error) {
            
        }
    }

    return{
        home,
        addReg,

    }
}