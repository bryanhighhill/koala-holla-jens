const express = require('express');
const koalaRouter = express.Router();


// DB CONNECTION


// GET
koalaRouter.get('/',(req, res)=> {
    res.send(koalasList);
    console.log('GET request from server');
})

// POST
koalaRouter.post('/', (req, res) =>{
    res.send(req.body);
    console.log('POST was made');
})

// PUT


// DELETE

module.exports = koalaRouter;