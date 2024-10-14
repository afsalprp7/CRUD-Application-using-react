const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database/dbConfig')
const authRouter = require('./routes/authRoutes');
const adminRouter  = require('./routes/adminRoutes')
const path = require('path')
require('dotenv').config()
 

app.use(cors({
    origin : process.env.front_End_URL
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/',authRouter);
app.use('/',adminRouter);

app.use('/uploadedImages',express.static(path.join(__dirname, 'uploadedImages')));

app.listen(process.env.PORT,()=>{
    console.log(`Server running in port ${process.env.PORT}`);
});