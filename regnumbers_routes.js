"use strict";

module.exports = function Routes(RegFact) {
  let pattern1 = /^((CA|CK|CL)\s([0-9]){6})$/i;
  let pattern2 = /^((CA|CK|CL)\s\d{3}\s\d{3})$/i;
  let pattern3 = /^((CA|CK|CL)\s\d{3}\-\d{3})$/i;

  const home = async (req, res) => {
    try {
      res.render("index", {
        eachRegNo: await RegFact.getReg(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addReg = async (req, res) => {
    try {
      let emptyFieldError = "*Please enter a registration number*";
      let alreadyExistRegError = "*Registration number already exist*";
      let incorrectRegFormat ="*Please enter reg from these towns in this format [CL 123452] OR [CK 123-321] OR [CL 012 658]*";
      
      let reg = req.body.enteredReg;

      let myList = await RegFact.list(reg);

      if (reg) {
        if ((reg && pattern1.test(reg)) ||pattern2.test(reg) ||pattern3.test(reg)) {
          if (myList == 0) {
            console.log(reg);
            req.flash("successfulMessage", "*Successfully added registration*");

            await RegFact.setReg(reg);

            console.log("done adding");
          } else {
            req.flash("error", alreadyExistRegError);
          }
        } else {
          req.flash("error", incorrectRegFormat);
        }
      } else {
        req.flash("error", emptyFieldError);
      }

      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  const townRegistrations = async (req, res) => {
    try {
      var checkedTown = req.body.town;

      let townReg = await RegFact.filter(checkedTown);
      if (checkedTown) {
        res.render("index", {
          townReg,
        });
      } else {
        req.flash("error", "*Please select a town*");
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function addRegsOnUrl(req, res) {
    try {
      let regs = req.params.entered_regs;
      res.render("enteredRegs", {
        regs,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const showAllRegs = async (req, res) => {
    try {
      res.render("index", {
        eachRegNo: await RegFact.showAll(),
      });
    } catch (error) {}
  };

  const clearDataBase = async (req, res) => {
    try {
      await RegFact.resert();
      req.flash("successfulMessage", "*Successfully cleared the database*");

      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    home,
    addReg,
    clearDataBase,
    townRegistrations,
    showAllRegs,
    addRegsOnUrl,
  };
};
