'use strict';

module.exports = function Routes(RegFact){

    // let addedRegs = ''

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
        // console.log(await RegFact.getReg())
        try {
            var reg = req.body.enteredReg

            if(reg){
                console.log(reg);
                // addedRegs = await RegFact.getReg({
                //     reg
                // });
                await RegFact.setReg(reg);
                console.log('done adding')
            }
        console.log('before redirect');
            res.redirect('/');
            
        } catch (error) {
            console.log(error)
        }
    }

    return{
        home,
        addReg,

    }
}