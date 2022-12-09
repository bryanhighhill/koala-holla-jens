const express = require('express');
const koalaRouter = express.Router();

const pg = require('pg');

const Pool = pg.Pool;

// DB CONNECTION
const pool = new Pool({
    database: 'Koala_Holla',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000, 
});

pool.on('connect', ()=> {
    console.log('postgres is connected');
});

pool.on('error', (error)=> {
    console.log('error connecting to the database: ', error);
});


// GET request from database
koalaRouter.get('/',(req, res)=> {
    let queryText = 'SELECT * FROM koalas;'; 
    pool.query(queryText)
    .then((result) => { 
        console.log('results from DB', result);
        res.send(result.rows); 
    })
    .catch((error) => {
        console.log('error making a query', error);
        res.sendStatus(500); 
    })
    console.log('GET request from server');
});

// POST
//POST Request to database
koalaRouter.post('/', (req, res) => {
    const newKoala = req.body;

    let name = newKoala.name;
    let gender = newKoala.gender;
    let age = newKoala.age;
    let ready_to_transfer = newKoala.readyToTransfer;
    let notes = newKoala.notes;

    console.log(`ready_to_transfer = ${ready_to_transfer}`);

    //insert query, to insert info into database
    const queryText = `
    INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
    VALUES ('${name}', '${gender}', ${age}, '${ready_to_transfer}', '${notes}');
    `; 

    pool.query(queryText)
    .then((result) => {
        console.log('result', result);
        res.sendStatus(201); //created status
    })
    .catch((error) => {
        console.log('error making post insert query', error);
        res.sendStatus(500); //server error status
    });
});


koalaRouter.post('/', (req, res) =>{
    res.send(req.body);
    console.log('POST was made');
})

// PUT


// DELETE

module.exports = koalaRouter;