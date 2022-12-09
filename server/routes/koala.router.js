const express = require('express');
const koalaRouter = express.Router();

const pg = require('pg');

// DB CONNECTION


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
})

// POST
//POST Request to database
router.post('/', (req, res) => {
    const newKoala = req.body;

    let name = newKoala.name;
    let gender = newKoala.gender;
    let age = newKoala.age;
    let readyToTransfer = newKoala.readyForTransfer;

    //insert query, to insert info into database
    const queryText = `
    INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
    VALUES (${name}, ${gender}, ${age}, ${readyToTransfer}),
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