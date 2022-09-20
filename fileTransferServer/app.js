const express = require('express');
const cors = require('cors');
const fileController = require('./controller/fileTransferController');
const app=express();
app.use(cors())
app.use(fileController);
module.exports=app;