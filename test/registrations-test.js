const assert = require('assert');
const reg = require('../reg_numbers');
const pg = require('pg');

const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/registration_tests';


const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
})

let Regs = reg(pool);

describe('registration_numbers_webapp', function (){
    beforeEach(async function (){
        await pool.query('delete from registrations');
        // await pool.query('delete from towns');
    });

    describe('testing add function', async function (){
        it('should be able to set and get the entered unique registration number CA 12547, CL 12345 and CK 12345', async function (){
            let Regs = reg(pool);
            
            // await Regs.setReg('CL 123456');
            await Regs.setReg('CA 123456');
            // await Regs.setReg('CK 123-452');

            // console.log(Regs.getReg());
            // assert.deepEqual(['CA 123-456', 'CL 123456', 'CK 123 452'], await Regs.getReg());
            assert.equal([{entered_regs:'CA 123456'}], await Regs.getReg());

            // assert.deepEqual([{greeted_names:"Maarman"}], await salute.getName());

        })

        it('should be able to add a registration from Cape Town successfully', async function() {
            let Regs = reg(pool);

            await Regs.setReg('CA 254782');
            assert.equal('CA 254782', await Regs.getReg());
        });
        it('should be able to add a registration from Malmesbury successfully', async function() {
            let Regs = reg(pool);

            await Regs.setReg('CK 254782');
            assert.equal('CK 254782', await Regs.getReg());
        });
        it('should be able to add a registration from Stellenbosch successfully', async function() {
            let Regs = reg(pool);

            await Regs.setReg('CL 254782');
            assert.equal('CL 254782', await Regs.getReg());
        });
        it('should be able to add a registration number of a lower case and display it as Uppercase', async function() {
            let Regs = reg(pool);

            await Regs.setReg('ca 123456');
            assert.equal('CA 123456', await Regs.getReg());
        });

    })
    
})