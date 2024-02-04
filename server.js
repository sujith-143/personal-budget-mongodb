const { log } = require('console');
const express =require('express');
const app=express()
const port=3000;
const fileSystem = require('fs');
const importJSON = fileSystem.readFileSync('data.json','utf8');
const dataSource = JSON.parse(importJSON);

app.use('/', express.static('public'));

const budget = []

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/budget', (req,res)=>{
  
  res.json(dataSource);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});