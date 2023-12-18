const express = require('express');
const cors = require('cors')
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(cors())
const PORT = process.env.PUBLIC_PORT || 5000;

app.use('/Meesho',require('./Routes'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});